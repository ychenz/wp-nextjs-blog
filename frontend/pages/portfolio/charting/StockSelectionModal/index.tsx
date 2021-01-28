import React, { ReactElement } from "react";
import EditText from "components/EditText";
import Button from "components/Button";
import ModalLayout from "components/ModalLayout";
import AddStockIcon from "static/images/Add.svg";
import RemoveStockIcon from "static/images/Minus.svg";
import {
  ContentContainer,
  Title,
  EditTextContainer,
  AddComparisonButtonContainer,
  AddComparisonButtonText,
  SaveButtonContainer
} from "page-assets/portfolio/charting/StockSelectionModal/styles";

export interface SavedSymbols {
  symbol: string;
  symbol2?: string;
}

interface StockSelectionModalProps {
  hidden: boolean;
  value: SavedSymbols;
  onSave(symbols: SavedSymbols): void;
  onToggle(): void;
}

interface StockSelectionModalState {
  symbol: string;
  symbol2?: string|null;
  hasSymbol2: boolean;
}

class StockSelectionModal extends React.PureComponent<StockSelectionModalProps, StockSelectionModalState> {
  state = {
    symbol: "",
    symbol2: null,
    hasSymbol2: false
  }

  componentDidMount(): void {
    const { value } = this.props;

    this.setState({
      symbol: value.symbol,
      symbol2: value.symbol2,
      hasSymbol2: !!value.symbol2
    });
  }

  handleStockTickerChange = (value: string): void => {
    this.setState({ symbol: value });
  }

  handleStockTicker2Change = (value: string): void => {
    this.setState({ symbol2: value });
  }

  handleToggleStock2Input = (): void => {
    const { hasSymbol2, symbol2 } = this.state;

    this.setState({
      hasSymbol2: !hasSymbol2,
      symbol2: hasSymbol2 ? null : symbol2
    });
  }

  handleSaveClicked = (): void => {
    const { onSave, onToggle } = this.props;
    const { symbol, symbol2 } = this.state;

    onSave({
      symbol,
      symbol2
    });

    onToggle();
  }

  render(): ReactElement {
    const { hidden, onToggle } = this.props;
    const { symbol, hasSymbol2, symbol2 } = this.state;

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
              value={symbol}
              onChange={this.handleStockTickerChange}
              placeholder="Stock Ticker"
              maxLength={10}
              // todo using values from API
              dropdownValues={symbol && [
                { value: "AAPL", description: "Apple Inc." },
                { value: "GOOGL", description: "Alphabet Inc Class A" },
              ]}
              disallowEmpty
            />
          </EditTextContainer>

          <AddComparisonButtonContainer type="button" onClick={this.handleToggleStock2Input}>
            <div>
              {hasSymbol2 ? <RemoveStockIcon /> : <AddStockIcon />}
            </div>
            <AddComparisonButtonText>
              {hasSymbol2 ? "Remove Stock Comparison" : "Compare Stock Return"}
            </AddComparisonButtonText>
          </AddComparisonButtonContainer>

          {hasSymbol2 && (
            <EditTextContainer>
              <EditText
                value={symbol2}
                onChange={this.handleStockTicker2Change}
                placeholder="Stock Ticker To Compare With"
                maxLength={10}
                // todo using values from API
                dropdownValues={symbol && [
                  { value: "M", description: "Macy's" },
                  { value: "AXP", description: "American Express Co." },
                  { value: "TSLA", description: "Tesla Motor" },
                ]}
                disallowEmpty
              />
            </EditTextContainer>
          )}

          <SaveButtonContainer>
            <Button name="SAVE" onClick={this.handleSaveClicked} />
          </SaveButtonContainer>
        </ContentContainer>
      </ModalLayout>
    );
  }
}

export default StockSelectionModal;
