/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { PureComponent, ReactElement } from "react";
import StackGrid, { transitions, easings } from "react-stack-grid";
import Error from "next/error";
import Layout from "components/Layout";
import PageWrapper from "components/PageWrapper";
import PostCardView from "components/PostCardView";
import CategoryPill from "components/CategoryPill/CategoryPill";
import wp from "services/WPAPIConfig";
import { WPCategory, WPPost } from "services/dataModels";
import {
  CategoryContainer
} from "./styles";

const transition = transitions.scaleDown;

interface TopicsPageProps {
  posts: WPPost[];
  categories: WPCategory[];
  slug: string; // Category name passed from route e.g: /category/test-category
}

class TopicsPage extends PureComponent<TopicsPageProps> {
  static async getInitialProps(context): Promise<{ slug: string; categories: WPCategory[]; posts?: WPPost[] }>{
    const { slug } = context.query;

    const categories: WPCategory[] = await wp
      .categories()
      .embed();

    if (categories.length > 0) {
      const posts = await wp
        .posts()
        .category(categories.filter(category => category.slug === slug)[0].id)
        .embed();

      return { slug, categories, posts  };
    }

    return { slug, categories };
  }

  render(): ReactElement {
    const { slug, categories, posts } = this.props;

    if (categories.length === 0) {
      return <Error statusCode={404}/>;
    }

    return (
      <Layout>
        <CategoryContainer>
          {categories.map(category => (
            <CategoryPill key={category.slug} isActive={category.slug === slug} category={category} />
          ))}
        </CategoryContainer>
        <StackGrid
          columnWidth={312}
          monitorImagesLoaded
          duration={300}
          gutterWidth={16}
          gutterHeight={16}
          easing={easings.cubicOut}
          appearDelay={60}
          appear={transition.appear}
          appeared={transition.appeared}
          enter={transition.enter}
          entered={transition.entered}
          leaved={transition.leaved}
        >
          {posts.map(post => {
            return (
              <PostCardView post={post} />
            );
          })}
        </StackGrid>
      </Layout>
    );
  }
}

export default PageWrapper(TopicsPage);
