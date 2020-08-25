import React, { PureComponent } from "react";
import CrossIcon from "static/images/Cross.svg";
import {
  Root,
  FormInput,
  ClearButtonContainer,
  ErrorText,
  DropDownMenuContainer,
  DropDownMenuEntry,
  DropDownMenuTitle,
  DropDownMenuDescription
} from "./styles";

interface DropdownMenuData {
  value: string;
  description?: string;
}

interface EditTextProps {
  value: string;
  maxLength?: number;
  type?: "text"|"password";
  placeholder?: string;
  dropdownValues?: DropdownMenuData[]; // Values to be displayed in the dropdown, for auto-completion
  onChange(value: string): void;

  // Error checking props. The editText will automatically report error if any of the follows exists
  disallowEmpty?: boolean;
  errorText?: string; // Showing error state with the specified text
}

interface EditTextState {
  forceHideDropdown: boolean;
}

class EditText extends PureComponent<EditTextProps, EditTextState> {
  state = {
    forceHideDropdown: true
  }

  get isError(): boolean {
    const { errorText, disallowEmpty, value } = this.props;

    return Boolean(errorText) || (disallowEmpty && !value);
  }

  onValueChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { onChange } = this.props;

    onChange(e.target.value);
    this.setState({ forceHideDropdown: false });
  }

  handleClearClick = (): void => {
    const { onChange } = this.props;

    onChange("");
  }

  handleDropdownEntryClick = (value: string): void => {
    const { onChange } = this.props;

    onChange(value);
    this.setState({ forceHideDropdown: true });
  }

  renderDropdownMenu(): React.ReactElement  {
    const { dropdownValues } = this.props;

    return (
      <DropDownMenuContainer>
        {dropdownValues.map(entry => (
          <DropDownMenuEntry
            key={entry.value}
            onClick={(): void => this.handleDropdownEntryClick(entry.value)}
          >
            <DropDownMenuTitle>{entry.value}</DropDownMenuTitle>
            <DropDownMenuDescription>{entry.description}</DropDownMenuDescription>
          </DropDownMenuEntry>
        ))}
      </DropDownMenuContainer>
    );
  }

  render(): React.ReactElement {
    const {
      maxLength, type, placeholder, value, errorText, disallowEmpty, dropdownValues
    } = this.props;
    const { forceHideDropdown } = this.state;

    return (
      <Root>
        {value && (
          <ClearButtonContainer onClick={this.handleClearClick}>
            <CrossIcon />
          </ClearButtonContainer>
        )}

        <FormInput
          value={value}
          maxLength={maxLength}
          type={type}
          placeholder={placeholder}
          onChange={this.onValueChange}
          error={this.isError}
        />

        {!forceHideDropdown && dropdownValues && this.renderDropdownMenu()}

        {errorText && (
          <ErrorText>{errorText}</ErrorText>
        )}

        {!errorText && disallowEmpty && !value && (
          <ErrorText>This field cannot be empty</ErrorText>
        )}
      </Root>
    );
  }
}

export default EditText;