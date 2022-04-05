/*!
 * Copyright (c) 2012-2022 Digital Bazaar, Inc. All rights reserved.
 */
import {config} from '@bedrock/core';
import {createRequire} from 'module';
import {fileURLToPath} from 'url';
import fs from 'fs';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

const DEFAULT_FRAMEWORKS = ['mocha', 'chai'];
const DEFAULT_PREPROCESSORS = ['babel', 'webpack'];

// add karma as available test framework
config.test.frameworks.push('karma');

config.karma = {};
config.karma.suites = {};
config.karma.options = {};
config.karma.defaults = {
  DEFAULT_FRAMEWORKS,
  DEFAULT_PREPROCESSORS
};

config.karma.config = {
  // base path that will be used to resolve all patterns (eg. files, exclude)
  basePath: '',

  // frameworks to use
  // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
  frameworks: DEFAULT_FRAMEWORKS,

  // list of files / patterns to load in the browser
  files: [
    require.resolve('regenerator-runtime/runtime')
  ],

  // list of files to exclude
  exclude: [],

  // preprocess matching files before serving them to the browser
  // available preprocessors:
  //   https://npmjs.org/browse/keyword/karma-preprocessor
  preprocessors: {},

  webpack: {
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.vue$/,
          use: {
            loader: require.resolve('vue-loader'),
            options: {
              hotReload: false,
              cssSourceMap: false,
              loaders: {
                js: [
                  {
                    loader: require.resolve('babel-loader'),
                    options: {
                      presets: [
                        // normal mode
                        require.resolve('babel-preset-env')
                      ],
                      plugins: [
                        require.resolve('babel-plugin-syntax-dynamic-import'),
                        [
                          require.resolve(
                            'babel-plugin-transform-object-rest-spread'),
                          {useBuiltIns: true}
                        ]
                      ]
                    }
                  }
                ],
                css: require.resolve('vue-style-loader') + '!' +
                  require.resolve('css-loader')
              }
            }
          }
        }
      ]
    }
  },

  // test results reporter to use
  // possible values: 'dots', 'progress'
  // available reporters: https://npmjs.org/browse/keyword/karma-reporter
  //reporters: ['progress'],
  reporters: ['mocha'],

  coverageIstanbulReporter: {
    reports: ['text', 'text-summary', 'lcov'],
    fixWebpackSourcePaths: true
  },

  protocol: 'https:',
  httpsServerOptions: {
    key: fs.readFileSync(path.join(
      __dirname, '..', 'pki', 'server.key'), 'utf8'),
    cert: fs.readFileSync(path.join(
      __dirname, '..', 'pki', 'server.crt'), 'utf8')
  },
  // web server port
  port: 9876,

  // enable / disable colors in the output (reporters and logs)
  colors: true,

  // level of logging
  // possible values: config.LOG_DISABLE || config.LOG_ERROR ||
  // config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
  logLevel: config.LOG_WARN,

  // enable / disable watching file and executing tests whenever any file
  // changes
  autoWatch: false,

  // start these browsers
  // available browser launchers:
  //   https://npmjs.org/browse/keyword/karma-launcher
  //browsers: ['PhantomJS', 'Chrome', 'Firefox', 'Safari'],
  browsers: ['Chrome_without_security'],
  customLaunchers: {
    Chrome_without_security: {
      base: 'ChromeHeadless',
      flags: [
        '--disable-web-security',
        '--ignore-ssl-errors',
        '--ignore-certificate-errors'
      ]
    }
  },

  // Continuous Integration mode
  // if true, Karma captures browsers, runs the tests and exits
  singleRun: true,

  // Concurrency level
  // how many browser should be started simultaneous
  concurrency: Infinity,

  // Mocha
  client: {
    mocha: {
      // increase from default 2s
      timeout: 10000,
      reporter: 'html'
      //delay: true
    }
  },

  // Proxied paths
  proxies: {}
};
