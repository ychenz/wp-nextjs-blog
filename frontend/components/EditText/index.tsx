import React from "react";
import CrossIcon from "static/images/Cross.svg";
import {
  Root,
  FormInput,
  ClearButtonContainer
} from "./styles";

interface EditTextProps {
  maxLength?: number;
  type?: "text"|"password";
  placeholder?: string;
  value: string;
  onChange(value: string): void;
}

class EditText extends React.PureComponent<EditTextProps> {
  onValueChange = (e): void => {
    const { onChange } = this.props;

    onChange(e.target.value);
  }

  handleClearClick = (): void => {
    const { onChange } = this.props;

    onChange("");
  }

  render() {
    const { maxLength, type, placeholder, value } = this.props;

    return (
      <Root>
        {value && (
          <ClearButtonContainer onClick={this.handleClearClick}>
            <CrossIcon />
          </ClearButtonContainer>
        )}

        <FormInput value={value} maxLength={maxLength} type={type} placeholder={placeholder} onChange={this.onValueChange} />
      </Root>
    );
  }
}

export default EditText;