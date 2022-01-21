import {by, element, ElementFinder} from 'protractor';

export class CarDetails {
    private readonly _descriptionSelector = '[data-component="Heading"]';
    private readonly _priceSelector = '[data-component="LocalizedPrice"]';
    private readonly _root: ElementFinder;

    constructor(id: string) {
     this._root = element(by.xpath(`//a[contains(@data-e2e-id,'${id}')]`));
    }

    public async getDescription(): Promise<string> {
        return this._root.$$(this._descriptionSelector).first().getText();
    }

    public async getPrice(): Promise<string> {
        return this._root.$$(this._priceSelector).first().getText();
    }
}
