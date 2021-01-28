import React from "react";
import Navigation from "../Navigation";
import wp from "../../services/WPAPIConfig";
import "./styles.scss";

const PageWrapper = Comp =>
  class extends React.Component {
    static async getInitialProps(args) {
      const [headerMenu, childProps] = await Promise.all([
        wp.menus().id("header-menu"),
        Comp.getInitialProps ? Comp.getInitialProps(args) : {},
      ]);

      return {
        headerMenu,
        ...childProps,
      };
    }

    render() {
      const { headerMenu } = this.props;

      return (
        <div className="PageWrapper">
          <Navigation menu={headerMenu} />
          <div className="PageWrapper__children">
            <Comp  {...this.props} />
          </div>
        </div>
      );
    }
  };

export default PageWrapper;
