import {OurVehiclesPo} from "../pages/private-lease/our-vehicles.po";

describe('filter cars: ', () => {
    const ourVehiclesPage = new OurVehiclesPo();

    beforeAll(async () => {
        await ourVehiclesPage.open();
        await ourVehiclesPage.waitForPageToLoad();
    });

    afterEach(async () => {
        await ourVehiclesPage.resetFilters();
    });

    // example of a positive scenario
    it('find cars using pop filters + make&model', async () => {
        const expectedCarDescription = 'Audi A4 Avant';
        const expectedCarPrice = '669';
        const carId = 'audi-a4-avant';
        let expectedCar;

        await ourVehiclesPage.filterCarsByType('Petrol');
        await ourVehiclesPage.applyPopFilter('Best Deals');
        await ourVehiclesPage.applyMakeAndModelFilter('Audi');

        expectedCar = await ourVehiclesPage.getCarById(carId);

        expect((await ourVehiclesPage.getFilteredCards(1)).length).toBe(1, 'Incorrect amount of cars filtered');
        expect(await expectedCar.getDescription()).toBe(expectedCarDescription, 'Incorrect car description');
        expect(await expectedCar.getPrice()).toContain(expectedCarPrice, 'Incorrect car price');
    });

    // example of a negative scenario
    it('find cars using filters + search', async () => {
        const searchKey = "Zzz";
        const expectedNoResultsMessage = `0 results for "${searchKey}"`;
        const expectedTryAgainMessage = 'Try searching again, or browse our selection of vehicles below';

        await ourVehiclesPage.searchbox.search('Zzz');

        expect(await ourVehiclesPage.getNothingFoundMsg()).toBe(expectedNoResultsMessage, 'Incorrect no results message');
        expect(await ourVehiclesPage.getTryAgainMsg()).toBe(expectedTryAgainMessage, 'Incorrect no results message');
    });
});
