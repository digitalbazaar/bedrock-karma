/*!
 * Copyright (c) 2012-2022 Digital Bazaar, Inc. All rights reserved.
 */
import * as bedrock from '@bedrock/core';
import * as brTest from '@bedrock/test';
import httpModule from './http.js';
import karma from 'karma';
import path from 'path';

// load config defaults
import './config.js';

const {Server} = karma;

bedrock.events.on('bedrock.tests.run', state => {
  if(brTest.test.shouldRunFramework('karma')) {
    return run(state);
  }
  if(brTest.test.shouldRunFramework('karma-coverage')) {
    return run(state, {coverage: true});
  }
  if(brTest.test.shouldRunFramework('karma-coverage-ci')) {
    return run(state, {coverage: true, coverageCi: true});
  }
});

function run(state, {coverage = false, coverageCi = false} = {}) {
  return new Promise(resolve => {
    const command = bedrock.config.cli.command;
    if(!command.karmaSuite &&
      Object.keys(bedrock.config.karma.suites).length === 0) {
      // no tests to run
      console.log('No karma tests to run.');
      // print eol
      console.log();
      return resolve();
    }

    const karmaConfig = generateKarmaConfig({coverage, coverageCi});

    const server = new Server(karmaConfig);

    server.on('run_complete', (browsers, results) => {
      if(results.failed > 0) {
        state.pass = false;
      }
      resolve();
    });

    console.log('Running tests via Karma...');
    server.start();
  });
}

function generateKarmaConfig({coverage, coverageCi}) {
  const {karma: {config: karmaConfig}} = bedrock.config;
  const {karma: {defaults: {DEFAULT_PREPROCESSORS}}} = bedrock.config;

  Object.keys(bedrock.config.karma.suites).forEach(key => {
    const testSuite = bedrock.config.karma.suites[key];

    karmaConfig.files.push({
      pattern: testSuite,
      watched: false,
      served: true,
      included: true
    });

    karmaConfig.preprocessors[testSuite] = DEFAULT_PREPROCESSORS;
  });

  if(!('httpModule' in karmaConfig)) {
    // override httpModule to handle cluster issues
    karmaConfig.httpModule = httpModule;
  }

  if(coverage || coverageCi) {
    karmaConfig.coverageIstanbulReporter = {
      reports: ['text', 'text-summary', 'lcovonly'],
      fixWebpackSourcePaths: true,
    };
    karmaConfig.webpack.module.rules.push({
      test: /\.js$/,
      use: '@jsdevtools/coverage-istanbul-loader',
      include: path.resolve('../'),
      exclude: /(test|node_modules)/
    });
    karmaConfig.reporters.push('coverage-istanbul');

    if(!coverageCi) {
      karmaConfig.coverageIstanbulReporter.reports.push('html');
      karmaConfig.coverageIstanbulReporter['report-config'] = {
        html: {
          subdir: 'report-html'
        }
      };
    }
  }

  return karmaConfig;
}
