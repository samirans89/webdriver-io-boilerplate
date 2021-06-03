import {
  clickNextButton,
  clickPaypalButton,
  enterPhoneNumber,
  switchToPaypalFrame,
} from "./action";

export function switchWindow(): void {
  const windows: string[] = browser.getWindowHandles();
  browser.switchToWindow(windows[1]);
}

export function checkoutWithPaypal(): void {
  switchToPaypalFrame();
  clickPaypalButton();
  browser.switchToParentFrame();
}

export function loginWithPhoneNumber(phoneNumber: string): void {
  enterPhoneNumber(phoneNumber);
  clickNextButton();
}
