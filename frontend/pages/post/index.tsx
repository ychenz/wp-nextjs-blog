import React, { PureComponent, ReactElement } from "react";
import Link from "next/link";
import Error from "next/error";
import wp from "services/WPAPIConfig";
import { WPPost, getFeaturedImageUrl, getCategories, WPCategory } from "services/dataModels";
import { formatDate } from "services/string";
import Layout from "components/Layout";
import PageWrapper from "components/PageWrapper";
import {
  Root,
  Title,
  CreationDate,
  CategoryLink,
  CategoryContainer,
  Content
} from "./styles";

interface PostProps {
  post: WPPost;
}

class Post extends PureComponent<PostProps> {
  static async getInitialProps(context): Promise<{post:WPPost}> {
    const { slug, apiRoute } = context.query;

    let apiMethod = wp.posts();

    switch (apiRoute) {
      case "category":
        apiMethod = wp.categories();
        break;
      case "page":
        apiMethod = wp.pages();
        break;
      default:
        break;
    }

    const post = await apiMethod
      .slug(slug)
      .embed()
      .then(data => {
        return data[0];
      });

    return { post };
  }

  static renderCategoryPill(category: Partial<WPCategory>): ReactElement {
    const urlPathname = `/category/${category.slug}`;

    return (
      <Link
        as={urlPathname}
        href={`/category?slug=${category.slug}&apiRoute=category`}
        key={category.id}
      >
        <CategoryLink categoryId={category.id}>{category.name}</CategoryLink>
      </Link>
    );
  }

  render(): ReactElement {
    const { post } = this.props;

    if (!post.title) {
      return <Error statusCode={404} />;
    }

    const heroUrl = getFeaturedImageUrl(post);
    const categories = getCategories(post);

    return (
      <Layout>
        <Root>
          <Title>{post.title.rendered}</Title>
          <CategoryContainer>
            <CreationDate>{formatDate(post.date_gmt)}</CreationDate>
            {categories && categories.map(category => Post.renderCategoryPill(category))}
          </CategoryContainer>
          {heroUrl ? (
            <div className={`hero flex items-center post-type-${post.type}`}>
              <img
                alt="Featured"
                className="w-100"
                src={heroUrl}
              />
            </div>
          ) : ""}
          <Content
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: post.content.rendered,
            }}
          />
        </Root>
      </Layout>
    );
  }
}

export default PageWrapper(Post);
