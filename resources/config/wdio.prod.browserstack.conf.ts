import { config as defaultConfig } from "./wdio.conf";
import * as _ from "lodash";
import * as parseArgs from "minimist";

const overrides = {
  user: process.env.BROWSERSTACK_USERNAME || "BROWSERSTACK_USERNAME",
  key: process.env.BROWSERSTACK_ACCESS_KEY || "BROWSERSTACK_ACCESS_KEY",
  specs: ["__tests__/*.test.ts"],
  host: "hub.browserstack.com",
  maxInstances: 5,
  capabilities: [
    {
      "browserstack.maskCommands":
        "setValues, getValues, setCookies, getCookies",
      "browserstack.debug": true,
      "browserstack.video": true,
      "browserstack.networkLogs": true,
      os: "OS X",
      os_version: "Catalina",
      browserName: "Chrome",
      browser_version: "latest",
      acceptInsecureCerts: true,
      name:
        parseArgs(process.argv.slice(2))["bstack-session-name"] ||
        "default_name",
      build:
        process.env.BROWSERSTACK_BUILD_NAME ||
        "browserstack-examples-webdriverio" + " - " + new Date().getTime(),
    },
  ],
  afterTest: function (
    test: { title: string },
    context: Record<string, unknown>,
    { passed, error }: Record<string, unknown>
  ) {
    if (parseArgs(process.argv.slice(2))["bstack-session-name"]) {
      browser.executeScript(
        'browserstack_executor: {"action": "setSessionName", "arguments": {"name":"' +
          parseArgs(process.argv.slice(2))["bstack-session-name"] +
          '" }}'
      );
    } else {
      browser.executeScript(
        'browserstack_executor: {"action": "setSessionName", "arguments": {"name":"' +
          test.title +
          '" }}'
      );
    }

    if (passed) {
      browser.executeScript(
        'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "Assertions passed"}}'
      );
    } else {
      browser.takeScreenshot();
      browser.executeScript(
        'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "At least 1 assertion failed. ' +
          error +
          '"}}'
      );
    }
  },
};

export const config = _.defaultsDeep(overrides, defaultConfig);
