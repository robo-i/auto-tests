import {WebElement} from 'selenium-webdriver';
import {browser, by, element, ElementFinder, ExpectedConditions as EC} from 'protractor';

export async function doesArrayContain(target: string[], values: string[]): Promise<boolean> {
    return await values
        .map(value => {
            const isValuePresent = target.includes(value);

            if (!isValuePresent) {
                console.log(`The following value is missing => `, value);
            }

            return isValuePresent;
        })
        .every(value => value);
}

export async function scrollIntoView(elem: WebElement): Promise<void> {
    await browser.executeScript('arguments[0].scrollIntoView(false)', elem);
}

export function findElementByText(selector: string, text: string): ElementFinder {
    return element(by.cssContainingText(selector, text));
}

export async function waitUntilVisible(element: ElementFinder, errorMessage?: string): Promise<void> {
    await browser.driver.wait(EC.visibilityOf(element), browser.params.longTimeout, errorMessage);
}

export async function waitUntilTextPresentInElement(element: ElementFinder, text: string, errorMessage?: string): Promise<void> {
    await browser.driver.wait(EC.textToBePresentInElement(element, text), browser.params.longTimeout, errorMessage);
}

export async function waitUntilClickable(element: ElementFinder, errorMessage?: string): Promise<void> {
    await browser.driver.wait(EC.elementToBeClickable(element), browser.params.shortTimeout, errorMessage);
}
