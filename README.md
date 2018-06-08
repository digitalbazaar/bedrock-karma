# bedrock-karma
Karma test framework for bedrock modules

## Quick Examples

```
npm install bedrock-karma
```

```js
var bedrock = require('bedrock');
var config = bedrock.config;

// add karma tests for your module/project to your config file
config.karma.suites['bedrock-foo'] = '/foo/test/tests/**/*.js';
```


## Configuration

For more documentation on configuration, see [config.js](./lib/config.js).


[bedrock]: https://github.com/digitalbazaar/bedrock
[karma]: https://github.com/karma-runner/karma
