import React, { ReactElement } from "react";
import Button from "components/Button";
import ModalLayout from "components/ModalLayout";
import { BLOG_NAME } from "../../../constants";
import {
  ModalContainer,
  Title,
  FormInput,
  AcknowledgeText,
  ButtonContainer
} from "./styles";

interface ModalProps {
  hidden: boolean;
  onToggle(): void;
}

interface ModalState {
  name: string;
  email: string;
}

class SubscriptionModal extends React.PureComponent<ModalProps, ModalState> {
  state = {
    name: "",
    email: ""
  }

  onNameChange = (e): void => {

    this.setState({
      name: e.target.value
    });
  }

  onEmailChange = (e): void => {
    this.setState({
      email: e.target.value
    });
  }

  onSubscribe = (): void => {
    const { name, email } = this.state;
  }


  render(): ReactElement {
    const { hidden, onToggle } = this.props;

    return (
      <ModalLayout
        hidden={hidden}
        onToggle={onToggle}
      >
        <ModalContainer>
          <Title><b>Subscribe</b> to receive notification whenever we publish new contents</Title>
          <FormInput maxLength={40} type="text" placeholder="*NAME" onChange={this.onNameChange} />
          <FormInput maxLength={255} type="text" placeholder="*EMAIL" onChange={this.onEmailChange} />
          <AcknowledgeText>
            - You agree to receive email from {BLOG_NAME} by clicking the subscribe button below
          </AcknowledgeText>
          <ButtonContainer>
            <Button name="SUBSCRIBE" onClick={this.onSubscribe}/>
          </ButtonContainer>
        </ModalContainer>
      </ModalLayout>
    );
  }
}

export default SubscriptionModal;
