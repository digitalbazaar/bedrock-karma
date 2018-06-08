/*
 * Bedrock Protractor Module Configuration
 *
 * Copyright (c) 2012-2018 Digital Bazaar, Inc. All rights reserved.
 */
const config = require('bedrock').config;

const DEFAULT_FRAMEWORKS = ['mocha', 'chai'];
const DEFAULT_PREPROCESSORS = ['babel', 'webpack', 'sourcemap'];

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
  files: [],

  // list of files to exclude
  exclude: [],

  // preprocess matching files before serving them to the browser
  // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
  preprocessors: {},

  webpack: {
    devtool: 'inline-source-map',
    mode: 'production',
    module: {
      rules: [
        {
          test: /\.js$/,
          include: [{
            // exclude node_modules by default
            exclude: /(node_modules)/
          }],
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['env']
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

  // web server port
  port: 9876,

  // enable / disable colors in the output (reporters and logs)
  colors: true,

  // level of logging
  // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
  logLevel: config.LOG_WARN,

  // enable / disable watching file and executing tests whenever any file changes
  autoWatch: false,

  // start these browsers
  // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
  //browsers: ['PhantomJS', 'Chrome', 'Firefox', 'Safari'],
  browsers: ['ChromeHeadless'],

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
