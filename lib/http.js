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

import https from 'node:https';

const api = {...https};
export {api as default};

api.createServer = (...args) => {
  const server = https.createServer.apply(this, args);
  const {listen} = server;
  server.listen = (...args) => {
    const options = args[0] || {};
    if(typeof options.address === 'function') {
      // `options` is a server instance whereby the karma code is trying to
      // reuse a handle that is already bound to a port; unfortunately, this
      // does not work with the `cluster` module when karma isn't running on
      // the primary process ... so here we close the server (to unbind the
      // handle) and then grab it ourselves ... and we do so exclusively, so
      // the port is not shared with other workers ... note that other
      // approaches to solve this problem were tried, like monkey-patching
      // NetUtils in karma to use `exclusive` but reusing a handle that was
      // exclusive to this worker did not work (it threw an invalid listen
      // argument error)
      const {port, address: host} = options.address();
      args[0] = {port, host, exclusive: true};
      options.once('close', () => {
        // wait two seconds before trying to open again as
        // `close` event does not mean port is unbound
        setTimeout(() => listen.apply(server, args), 2000);
      });
      options.close();
      return server;
    }
    return listen.apply(server, args);
  };
  return server;
};
