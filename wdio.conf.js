exports.config = {
  user: process.env.BROWSERSTACK_USERNAME,
  key: process.env.BROWSERSTACK_ACCESS_KEY,
  updateJob: false,
  specs: [
    "./__tests__/suites/paypal-button-click-pom.test.ts",
    "./__tests__/suites/paypal-button-click.test.ts",
  ],
  exclude: [],
  maxInstances: 10,
  commonCapabilities: {
    name: "Checkout testing",
  },

  capabilities: [
    {
      build: "test build",
      browser: "chrome",
      browser_version: "90.0",
      os: "Windows",
      os_version: "10",
    },
    {
      build: "test build",
      browser: "Firefox",
      browser_version: "latest",
      os: "Windows",
      os_version: "10",
    },
  ],
  logLevels: {
    webdriver: "info",
    "@wdio/browserstack-service": "info",
  },
  coloredLogs: true,
  screenshotPath: "./errorShots/",
  baseUrl: "",
  waitforTimeout: 10000,
  connectionRetryTimeout: 30000,
  connectionRetryCount: 3,
  host: "hub.browserstack.com",

  framework: "mocha",
};

// Code to support common capabilities
exports.config.capabilities.forEach(function (caps, index) {
  for (var i in exports.config.commonCapabilities)
    caps[i] = caps[i] || exports.config.commonCapabilities[i];
  exports.config.capabilities[index] = {
    ...caps,
    ...(caps["browser"] && { browserName: caps["browser"] }),
  };
});
