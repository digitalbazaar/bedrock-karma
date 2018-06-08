/*
 * Copyright (c) 2012-2018 Digital Bazaar, Inc. All rights reserved.
 */
const bedrock = require('bedrock');
const Server = require('karma').Server;

// load config defaults
require('./config');

bedrock.events.on('bedrock.tests.run', function(state, callback) {
  if(bedrock.test.shouldRunFramework('karma')) {
    return run(state, callback);
  }
  callback();
});

function run(state, callback) {
  const command = bedrock.config.cli.command;
  if(!command.karmaSuite &&
    Object.keys(bedrock.config.karma.suites).length === 0) {
    // no tests to run
    console.log('No karma tests to run.');
    // print eol
    console.log();
    return callback();
  }

  const karmaConfig = generateKarmaConfig();

  const server = new Server(karmaConfig);

  server.on('run_complete', function(browsers, results) {
    if(results.failed > 0) {
      state.pass = false;
    }
    return callback();
  });

  console.log('Running tests via Karma...');
  server.start();
}

function generateKarmaConfig() {
  const {karma: {config: karmaConfig}} = bedrock.config;
  const {karma: {defaults: {DEFAULT_PREPROCESSORS}}} = bedrock.config;

  Object.keys(bedrock.config.karma.suites).forEach(key => {
    const testSuite = bedrock.config.karma.suites[key];

    karmaConfig.files.push({
      pattern: testSuite,
      watched: false, served: true, included: true
    });

    karmaConfig.preprocessors[testSuite] = DEFAULT_PREPROCESSORS;
  });

  return karmaConfig;
}
