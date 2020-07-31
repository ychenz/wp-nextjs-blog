import React, { ReactElement } from "react";
import {
  Root,
} from "./styles";

interface ButtonProps {
  name: string;
  isLoading?: boolean;
  isSuccess?: boolean;
  isTransparent?: boolean;
  onClick(): void;
}

class Button extends React.PureComponent<ButtonProps> {

  render(): ReactElement {
    const { name, onClick, isLoading, isSuccess, isTransparent } = this.props;

    return (
      <Root isTransparent={isTransparent} onClick={onClick} >
        {isLoading && "LOADING ..." }
        {isSuccess && "SUCCESS!" }
        {!isLoading && !isSuccess && name}
      </Root>
    );
  }
}

export default Button;
