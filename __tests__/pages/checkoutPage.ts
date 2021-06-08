import { Page } from "./basePage";
/**
 * sub page containing specific selectors and methods for a specific page
 */
export class CheckoutPage extends Page {
  async notificationWarning(): Promise<WebdriverIOAsync.Element> {
    return await $("#content > div.notifications > p");
  }

  async _inputPhoneNumber(phoneNumber: string): Promise<void> {
    const email = await $("#email");
    await email.waitForClickable();
    await email.setValue(phoneNumber);
  }

  async isNotification(notificationText: string): Promise<boolean> {
    const notificationWarningLabel = await $(
      "#content > div.notifications > p"
    );
    await notificationWarningLabel.waitForDisplayed();
    const text = await notificationWarningLabel.getText();
    return text === notificationText;
  }

  async _clickNextButton(): Promise<void> {
    const nextButton = await $("#btnNext");
    await nextButton.waitAndClick();
  }

  async loginUsingPhoneNumber(phoneNumber: string): Promise<void> {
    await this._inputPhoneNumber(phoneNumber);
    await this._clickNextButton();
  }

  async open(): Promise<void> {
    return await super.open("");
  }
}
