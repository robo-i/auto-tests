import {$, ElementFinder} from 'protractor';
import {findElementByText, waitUntilClickable} from '../../utils/misc-utils';

export class Searchbox {
  private readonly _searchInput: ElementFinder;
  private readonly _searchButton: ElementFinder;

  constructor() {
    this._searchInput = $('[data-component="VehicleSearch"] input');
    this._searchButton = findElementByText('[data-e2e-button]', 'Search');
  }

  public async search(value: string): Promise<void> {
    await waitUntilClickable(this._searchInput, 'Searchbox is not clickable');
    await this._searchInput.sendKeys(value);
    await this._searchButton.click();
  }
}
