import {$, $$, ElementArrayFinder} from 'protractor';
import {findElementByText, waitUntilVisible} from "../../utils/misc-utils";
import {DropdownMultipleSelect} from "../entities/dropdown-multiple-select";
import {BasicPage} from "../basic.po";
import {CarDetails} from "../entities/car-details";
import {Searchbox} from "../entities/searchbox";

export class OurVehiclesPo extends BasicPage<OurVehiclesPo> {
    public readonly uniqueBreadcrumb = findElementByText('span.breadcrumbs__text', 'Our vehicles');
    public readonly popularFilters = new DropdownMultipleSelect($$('[data-key="popularFilters"]').last());
    public readonly searchbox = new Searchbox();
    public readonly makeModelFilters = new DropdownMultipleSelect($$('[data-key="makemodel"]').last());
    public readonly carProfiles = $$('[data-e2e-card]');
    public readonly resetFiltersBtn = $('[data-key="resetFilters"]');
    public readonly nothingFoundMessage = $('[data-key="features.showroom.search.noresults"]');
    public readonly tryAgainMessage = $('[data-key="features.showroom.search.tryagain"]');
    public readonly carsToChooseFromSelector = '[data-key="features.showroom.toChooseFrom"]';

    public constructor() {
        super('/business/showroom/');
    }

    public async filterCarsByType(type: string): Promise<void> {
        await $(`[data-key=${type}]`).click();
    }

    // a workaround to wait for a needed amount of cars
    public async getFilteredCards(size: number): Promise<ElementArrayFinder> {
        await waitUntilVisible(findElementByText(this.carsToChooseFromSelector, `${size} to choose from`),
            'Expected amount of cars is not filtered');
        return this.carProfiles;
    }

    public async applyPopFilter(option: string): Promise<void> {
        await this.popularFilters.selectOption(option);
    }

    public async applyMakeAndModelFilter(option: string): Promise<void> {
        await this.makeModelFilters.selectOption(option);
    }

    public async getCarById(carId: string): Promise<CarDetails> {
        return new CarDetails(carId);
    }

    public async resetFilters(): Promise<void> {
        await this.resetFiltersBtn.click();
    }

    public async getNothingFoundMsg(): Promise<string> {
        return this.nothingFoundMessage.getText();
    }

    public async getTryAgainMsg(): Promise<string> {
        return this.tryAgainMessage.getText();
    }

    public async waitForPageToLoad(): Promise<void> {
        await waitUntilVisible(this.uniqueBreadcrumb, 'Our vehicles page is not loaded');
    }
}
