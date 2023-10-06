/*!
 * Copyright 2012 - 2024 Digital Bazaar, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {config} from '@bedrock/core';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
import {VueLoaderPlugin} from 'vue-loader';
import fs from 'node:fs';
import path from 'node:path';
import webpack from 'webpack';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

const DEFAULT_FRAMEWORKS = ['mocha', 'chai', 'webpack'];
const DEFAULT_PREPROCESSORS = ['babel', 'webpack'];

// add karma and coverage targets as available test framework
config.test.frameworks.push('karma');
config.test.frameworks.push('karma-coverage');
config.test.frameworks.push('karma-coverage-ci');

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
          test: /\.js$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  [
                    '@babel/preset-env',
                    {
                      useBuiltIns: 'entry',
                      corejs: '3.22',
                      bugfixes: true,
                      targets: ['defaults', 'not IE 11']
                    }
                  ]
                ]
              }
            }
          ]
        },
        {
          test: /\.css$/,
          use: [
            'vue-style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.scss$/,
          use: [
            'vue-style-loader',
            'css-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.vue$/,
          use: {
            loader: 'vue-loader',
            options: {
              hotReload: false,
              cssSourceMap: false
            }
          }
        }
      ]
    },
    resolve: {
      fallback: {
        // empty to allow for apps to more easily add items
      }
    },
    plugins: [
      new VueLoaderPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ]
  },

  // test results reporter to use
  // possible values: 'dots', 'progress'
  // available reporters: https://npmjs.org/browse/keyword/karma-reporter
  //reporters: ['progress'],
  reporters: ['mocha'],

  // NOTE: See index.js for coverage support

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
