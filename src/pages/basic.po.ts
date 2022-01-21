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
    await this.waitForPageToLoad();
  };

  // ideally, should be done via browser.manage().addCookie('c1', 'c2', '/', domain);
  // but for this needed cookies are to be known
  public async acceptCookies(): Promise<void> {
    await waitUntilVisible(this.cookies, 'Cookies are not shown');
    await browser.executeScript('arguments[0].click();', this.cookies);
  };

  public abstract waitForPageToLoad(): Promise<void>;
}
