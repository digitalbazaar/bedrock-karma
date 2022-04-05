/*!
 * Copyright (c) 2012-2022 Digital Bazaar, Inc. All rights reserved.
 */
import {config} from '@bedrock/core';
import path from 'path';

config.karma.config.webpack.module.rules.unshift({
  test: /\.js$/,
  use: {
    loader: 'istanbul-instrumenter-loader',
    options: {
      esModules: true,
      compact: false
    }
  },
  include: path.resolve('../'),
  exclude: /(test|node_modules)/
});

config.karma.config.reporters.push('coverage-istanbul');
