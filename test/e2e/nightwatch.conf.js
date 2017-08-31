const chromeDriver = require('chromedriver');
const seleniumPath = require('selenium-server').path;
const config = require('../../config');

const chromeDriverPath = chromeDriver.path;
// http://nightwatchjs.org/gettingstarted#settings-file
module.exports = {
  src_folders: ['test/e2e/specs'],
  output_folder: 'reports/e2e',
  custom_assertions_path: ['test/e2e/custom-assertions'],

  selenium: {
    start_process: true,
    server_path: seleniumPath,
    port: 4444,
    cli_args: {
      'webdriver.chrome.driver': chromeDriverPath
    }
  },

  test_settings: {
    default: {
      selenium_port: 4444,
      selenium_host: 'localhost',
      default_path_prefix: '/wd/hub',
      silent: true,
      globals: {
        devServerURL: `http://localhost:${process.env.PORT || config.dev.port}`
      },
      desiredCapabilities: {
        browserName: 'chrome',
        chromeOptions: {
          args: ['--headless']
        },
        javascriptEnabled: true,
        acceptSslCerts: true
      }
    }
  }
};
