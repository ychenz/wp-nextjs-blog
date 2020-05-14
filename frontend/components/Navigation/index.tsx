import Link from "next/link";
import {withRouter, NextRouter} from 'next/router';
import React, {PureComponent, ReactElement} from "react";
import {
  Root,
  Title,
  Menu,
  MenuEntry,
  MenuButton,
  MenuSlider
} from "./styles";

const CLASS_NAME = "Navigation";

interface NavigationProps {
  router: NextRouter;
}

class Navigation extends PureComponent<NavigationProps> {
  menuRef = React.createRef<HTMLDivElement>();

  sliderRef = React.createRef<HTMLDivElement>();

  componentDidMount(): void {
    this.moveSlider();
  }

  componentDidUpdate(): void {
    this.moveSlider();
  }

  moveSlider(): void {
    const activeMenuEntry = this.menuRef.current.querySelector(`.${CLASS_NAME}__menu-entry--active`);

    if (!activeMenuEntry) {
      return;
    }

    const menuRec = this.menuRef.current.getBoundingClientRect();
    const activeMenuEntryRec = activeMenuEntry.getBoundingClientRect();
    const distance = activeMenuEntryRec.left - menuRec.left;
    const {width} = activeMenuEntryRec;

    requestAnimationFrame(() => {
      this.sliderRef.current.setAttribute(
        "style",
        `display: block; transform: translate3d(${distance}px, 0, 0); width: ${width}px`
      )
    })

  }

  render(): ReactElement {
    const {router} = this.props;

    return (
      <Root>
        <Title>Awesome Blog</Title>
        <Menu ref={this.menuRef}>
          <Link
            href="/"
          >
            <MenuEntry isActive={router.pathname === "/"}>
              Home
            </MenuEntry>
          </Link>
          <Link
            href="/login"
          >
            <MenuEntry isActive={router.pathname === "/login"}>
              login
            </MenuEntry>
          </Link>
          <MenuButton>Subscribe</MenuButton>
          <MenuSlider ref={this.sliderRef}/>
        </Menu>
      </Root>
    )
  }

}

export default withRouter(Navigation);
