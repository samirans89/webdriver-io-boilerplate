import {
  clickNextButton,
  clickPaypalButton,
  enterPhoneNumber,
  switchToPaypalFrame,
} from "./action";

export async function switchWindow(): Promise<void> {
  const windows: string[] = await browser.getWindowHandles();
  await browser.switchToWindow(windows[1]);
}

export async function waitAndClick(): Promise<void> {
  await this.waitForDisplayed();
  await this.waitForClickable({ timeout: 5000 });
  await this.click();
}

export async function checkoutWithPaypal(): Promise<void> {
  await switchToPaypalFrame();
  await clickPaypalButton();
  await browser.switchToParentFrame();
}

export async function loginWithPhoneNumber(phoneNumber: string): Promise<void> {
  await enterPhoneNumber(phoneNumber);
  await clickNextButton();
}
