import { expect } from "chai";
import { CheckoutPage } from "../pages/checkoutPage";
import { HomePage } from "../pages/homePage";

describe("Testing Paypal buttons", () => {

    beforeEach('Open StackDemo', () => {
        browser.url("https://developer.paypal.com/demo/checkout/#/pattern/client");
    });

    afterEach('clear sessionstorage', () => {
        browser.execute(() => sessionStorage.clear())
    });

    it("should start payment flow when clicking on paypal button", () => {
        const homePage = new HomePage();
        homePage.switchToPaypalFrame();
        homePage.clickPaypalButton();
        homePage.switchToParentFrame();

        const windows: string[] = browser.getWindowHandles();
        expect(windows.length).to.equal(2);
        browser.switchToWindow(windows[1]);

        const checkoutPage = new CheckoutPage();
        checkoutPage.inputPhoneNumber("1234567890");
        checkoutPage.clickNextButton();
        expect(checkoutPage.isNotification("You haven’t confirmed your mobile yet. Use your email for now.")).to.be.true;
    });
});
