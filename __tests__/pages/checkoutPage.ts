import { Page } from "./basePage";
/**
 * sub page containing specific selectors and methods for a specific page 
*/
export class CheckoutPage extends Page {
    /**
     * define selectors using getter methods
     */
    get loginText(): WebdriverIO.Element {
        return $('#email')
    }

    get nextButton(): WebdriverIO.Element {
        return $('#btnNext')
    }

    get notificationWarning(): WebdriverIO.Element {
        return $('#content > div.notifications > p')
    }

    inputPhoneNumber(phoneNumber: string): void {
        this.loginText.waitForClickable({ timeout: 5000 });
        this.loginText.setValue(phoneNumber);
    }

    isNotification(notificationText: string): boolean {
        this.notificationWarning.waitForDisplayed();
        const text = this.notificationWarning.getValue();
        return text === notificationText;
    }

    clickNextButton(): void {
        this.nextButton.waitForClickable({ timeout: 5000 });
        this.nextButton.click();
    }

    open(): string {
        return super.open('');
    }
}
