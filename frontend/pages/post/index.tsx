import React, { PureComponent, ReactElement } from "react";
import Error from "next/error";
import wp from "services/WPAPIConfig";
import { WPPost, getFeaturedImageUrl, getCategories } from "services/dataModels";
import { formatDate } from "services/string";
import Layout from "components/Layout";
import PageWrapper from "components/PageWrapper";
import CategoryPill from "components/CategoryPill/CategoryPill";
import {
  Root,
  Title,
  FeaturedImage,
  CreationDate,
  CategoryContainer,
  Content
} from "page-assets/post/styles";

interface PostProps {
  post: WPPost;
}

class PostPage extends PureComponent<PostProps> {
  static async getInitialProps(context): Promise<{post: WPPost}> {
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

  render(): ReactElement {
    const { post } = this.props;

    if (!post.title) {
      return <Error statusCode={404} />;
    }

    const featuredImageUrl = getFeaturedImageUrl(post);
    const categories = getCategories(post);

    return (
      <Layout>
        <Root>
          <Title>{post.title.rendered}</Title>
          <CategoryContainer>
            <CreationDate>{formatDate(post.date_gmt)}</CreationDate>
            {categories && categories.map(category => <CategoryPill category={category} />)}
          </CategoryContainer>
          {featuredImageUrl ? (
            <FeaturedImage>
              <img
                alt="Featured"
                src={featuredImageUrl}
              />
            </FeaturedImage>
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

export default PageWrapper(PostPage);
