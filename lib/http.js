/*
 * Copyright (c) 2012-2019 Digital Bazaar, Inc. All rights reserved.
 */
const https = require('https');

const api = Object.assign({}, https);
module.exports = api;

api.createServer = (...args) => {
  const server = https.createServer.apply(this, args);
  const {listen} = server;
  server.listen = (...args) => {
    const options = args[0] || {};
    if(typeof options.address === 'function') {
      // `options` is a server instance whereby the karma code is trying to
      // reuse a handle that is already bound to a port; unfortunately, this
      // does not work with the `cluster` module when karma isn't running on
      // the master thread ... so here we close the server (to unbind the
      // handle) and then grab it ourselves ... and we do so exclusively, so
      // the port is not shared with other workers ... note that other
      // approaches to solve this problem were tried, like monkey-patching
      // NetUtils in karma to use `exclusive` but reusing a handle that was
      // exclusive to this worker did not work (it threw an invalid listen
      // argument error)
      const {port, address: host} = options.address();
      args[0] = {port, host, exclusive: true};
      options.once('close', () => {
        listen.apply(server, args);
      });
      options.close();
      return server;
    }
    return listen.apply(server, args);
  };
  return server;
};
