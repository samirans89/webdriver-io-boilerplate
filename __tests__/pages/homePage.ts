import { Page } from "./basePage";
/**
 * sub page containing specific selectors and methods for a specific page 
*/
export class HomePage extends Page {
    /**
     * define selectors using getter methods
     */
    get paypalFrame(): WebdriverIO.Element {
        return $('div#paypal-button-container iframe')
    }

    get paypalButton(): WebdriverIO.Element {
        return $('[data-funding-source="paypal"]')
    }

    switchToPaypalFrame(): void {
        this.paypalFrame.waitForDisplayed();
        browser.switchToFrame(this.paypalFrame);
    }

    switchToParentFrame(): void {
        browser.switchToParentFrame();
    }

    clickPaypalButton(): void {
        this.paypalButton.waitForDisplayed();
        this.paypalButton.waitForClickable({ timeout: 5000 });
        this.paypalButton.click();
    }

    open(): string {
        return super.open('');
    }
}
