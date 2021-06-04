import { switchWindow, waitAndClick } from "../../__tests__/util/common";

export const config = {
  runner: "local",
  specs: ["__tests__/**/*.test.ts"],
  capabilities: [
    {
      maxInstances: 1,
      browserName: "chrome",
      acceptInsecureCerts: true,
    },
  ],
  logLevel: "warn",
  coloredLogs: true,
  bail: 0,
  baseUrl: "https://developer.paypal.com",
  waitforTimeout: 30000,
  connectionRetryTimeout: 120000,
  chromeOptions: {
    prefs: {
      "profile.default_content_setting_values.geolocation": 1,
    },
  },
  framework: "mocha",
  mochaOpts: {
    ui: "bdd",
    timeout: 150000,
  },
  afterTest: function (
    _test: Record<string, unknown>,
    _context: Record<string, unknown>,
    { error }: Record<string, unknown>
  ): void {
    if (error) {
      browser.takeScreenshot();
    }
  },
  before: function (): void {
    browser.addCommand("switchWindowForCheckout", switchWindow);
    browser.addCommand("waitAndClick", waitAndClick, true);
  },
};
