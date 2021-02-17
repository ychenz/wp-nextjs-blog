import React, { Component } from "react";
import Router from "next/router";
import StackGrid, { transitions, easings } from "react-stack-grid";
import wp from "../services/WPAPIConfig";
import Layout from "../components/Layout";
import PageWrapper from "../components/PageWrapper";
import PostCardView from "../components/PostCardView";

const transition = transitions.scaleDown;

class Index extends Component {
  static async getInitialProps() {
    // TODO Can't fetch blogs for now as blog is not ready
    // const posts = await wp.posts().embed();
    const posts = [];

    return { posts };
  }

  componentDidMount() {
    // Pointing home page to portfolio page temporarily, while blog is not ready to launch
    Router.push("/portfolio-new");
  }

  render() {
    const { posts } = this.props;

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

// PageWrapper Need to fetch menu from wordpress, disable for now
// export default PageWrapper(Index);
export default Index;
