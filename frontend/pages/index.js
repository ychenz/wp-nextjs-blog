import React, { Component } from "react";
import StackGrid, { transitions, easings } from "react-stack-grid";
import wp from "../services/WPAPIConfig";
import Layout from "../components/Layout";
import PageWrapper from "../components/PageWrapper";
import PostCardView from "../components/PostCardView";

const transition = transitions.scaleDown;

class Index extends Component {
  state = {
    id: "",
  };

  static async getInitialProps() {
    const posts = await wp.posts().embed();

    return { posts };
  }

  render() {
    const { posts } = this.props;
    console.log(posts[0]);

    return (
      <Layout>
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

export default PageWrapper(Index);

