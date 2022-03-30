/*!
 * Copyright (c) 2012-2022 Digital Bazaar, Inc. All rights reserved.
 */
import * as bedrock from 'bedrock';
import * as brTest from 'bedrock-test';
import httpModule from './http.js';
import {Server} from 'karma';

// load config defaults
import './config.js';

bedrock.events.on('bedrock.tests.run', state => {
  if(brTest.test.shouldRunFramework('karma')) {
    return run(state);
  }
});

function run(state) {
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

    const karmaConfig = generateKarmaConfig();

    if(!('httpModule' in karmaConfig)) {
      // override httpModule to handle cluster issues
      karmaConfig.httpModule = httpModule;
    }

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

function generateKarmaConfig() {
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

  return karmaConfig;
}
