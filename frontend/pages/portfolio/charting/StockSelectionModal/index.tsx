import React, { ReactElement } from "react";
import EditText from "components/EditText";
import Button from "components/Button";
import ModalLayout from "components/ModalLayout";
import AddStockIcon from "static/images/Add.svg";
import {
  ContentContainer,
  Title,
  EditTextContainer,
  AddComparisonButtonContainer,
  AddComparisonButtonText,
  SaveButtonContainer
} from "./styles";

interface StockSelectionModalProps {
  hidden: boolean;
  onToggle(): void;
}

interface StockSelectionModalState {
  ticker1Value: string;
}

class StockSelectionModal extends React.PureComponent<StockSelectionModalProps, StockSelectionModalState> {
  state = {
    ticker1Value: ""
  }

  handleStockTickerChange = (value: string): void => {
    this.setState({ ticker1Value: value });
  }

  handleSaveClicked = (): void => {

  }

  render(): ReactElement {
    const { hidden, onToggle } = this.props;
    const { ticker1Value } = this.state;

    return (
      <ModalLayout
        hidden={hidden}
        onToggle={onToggle}
      >
        <ContentContainer>
          <Title>
            Which stock are you looking for?
          </Title>

          <EditTextContainer>
            <EditText
              value={ticker1Value}
              onChange={this.handleStockTickerChange}
              placeholder="Stock Ticker"
              maxLength={10}
            />
          </EditTextContainer>

          <AddComparisonButtonContainer>
            <div>
              <AddStockIcon />
            </div>
            <AddComparisonButtonText>
              Compare Stock Return
            </AddComparisonButtonText>
          </AddComparisonButtonContainer>
        </ContentContainer>

        <SaveButtonContainer>
          <Button name="SAVE" onClick={this.handleSaveClicked} />
        </SaveButtonContainer>
      </ModalLayout>
    );
  }
}

export default StockSelectionModal;
