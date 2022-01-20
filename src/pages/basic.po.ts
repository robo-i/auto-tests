import {$, browser} from 'protractor';
import {waitUntilVisible} from '../utils/misc-utils';

export abstract class BasicPage<T extends BasicPage<T>> {
  public readonly URL = 'https://www.leaseplan.com/en-be';
  public readonly cookies = $('.accept-cookies-button');
  public readonly pageUrl: string;

  protected constructor(pageUrl?: string) {
    this.pageUrl = pageUrl ? this.URL.concat(pageUrl) : this.URL;
  }

  public async open(): Promise<void> {
    await browser.get(this.pageUrl);
    await this.acceptCookies();
  };

  // is there a better way to do that?
  public async acceptCookies(): Promise<void> {
    await waitUntilVisible(this.cookies, 'Cookies are not shown');
    await browser.executeScript('arguments[0].click();', this.cookies);
  };

  public abstract waitForPageToLoad(): Promise<void>;
}
