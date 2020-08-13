import React, { MouseEvent, ReactElement } from "react";
import {
  Root,
  Container
} from "./styles";

interface ModalLayoutProps {
  hidden: boolean;
  onToggle(): void;
}

class ModalLayout extends React.PureComponent<ModalLayoutProps> {
  handleClickOutside = (event: MouseEvent): void => {
    const { onToggle } = this.props;
    event.preventDefault();

    if(event.target === event.currentTarget) {
      onToggle();
    }
  }

  render(): ReactElement {
      const { children, hidden } = this.props;

      return (
        <Root
          hidden={hidden}
          onClick={this.handleClickOutside}
        >
          <Container hidden={hidden}>
            {children}
          </Container>
        </Root>
      );
  }
}

export default ModalLayout;
