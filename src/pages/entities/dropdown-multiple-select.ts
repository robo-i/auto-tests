import {by, element, ElementFinder} from 'protractor';
import {findElementByText, scrollIntoView, waitUntilVisible} from '../../utils/misc-utils';

export class DropdownMultipleSelect {
  private readonly _optionSelector = 'span';

  constructor(public root: ElementFinder) {}

  public async selectOption(value: string): Promise<void> {
    await this.expand();
    await waitUntilVisible(
      element(by.cssContainingText(this._optionSelector, value)),
      'Value is not found in the dropdown',
    );

    const requiredOption = findElementByText(this._optionSelector, value);

    await await scrollIntoView(requiredOption);
    await requiredOption.click();
  }

  public async selectSeveralOptions(values: string[]): Promise<void> {
    await this.expand();
    values.forEach(async value => await this.selectOption(value));
  }

  public async expand() {
    await waitUntilVisible(this.root, 'Value is not found in the dropdown');
    await this.root.click();
  }
}
