import { Page } from "./basePage";
/**
 * sub page containing specific selectors and methods for a specific page
 */
export class HomePage extends Page {
  async paypalButton(): Promise<WebdriverIOAsync.Element> {
    return await $('[data-funding-source="paypal"]');
  }

  async _switchToPaypalFrame(): Promise<void> {
    const paypalFrame = await $("div#paypal-button-container iframe");
    await paypalFrame.waitForDisplayed();
    await browser.switchToFrame(paypalFrame);
  }

  async _switchToParentFrame(): Promise<void> {
    await browser.switchToParentFrame();
  }

  async _clickPaypalButton(): Promise<void> {
    const paypalButton = await $('[data-funding-source="paypal"]');
    await paypalButton.waitForDisplayed();
    await paypalButton.waitAndClick();
  }

  async clickPaypalButton(): Promise<void> {
    await this._switchToPaypalFrame();
    await this._clickPaypalButton();
    await this._switchToParentFrame();
  }

  async open(): Promise<void> {
    return await super.open("");
  }
}
