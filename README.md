# bedrock-karma
Karma test framework for bedrock modules

## Quick Examples

```
npm install @bedrock/karma
```

```js
import {config} from `@bedrock/core`;

// add karma tests for your module/project to your config file
config.karma.suites['bedrock-foo'] = '/foo/test/tests/**/*.js';
```


## Configuration

For more documentation on configuration, see [config.js](./lib/config.js).


## Reference
[bedrock](https://github.com/digitalbazaar/bedrock)

[karma](https://github.com/karma-runner/karma)

## License

[Apache License, Version 2.0](LICENSE) Copyright 2011-2024 Digital Bazaar, Inc.

Other Bedrock libraries are available under a non-commercial license for uses
such as self-study, research, personal projects, or for evaluation purposes.
See the
[Bedrock Non-Commercial License v1.0](https://github.com/digitalbazaar/bedrock/blob/main/LICENSES/LicenseRef-Bedrock-NC-1.0.txt)
for details.

Commercial licensing and support are available by contacting
[Digital Bazaar](https://digitalbazaar.com/) <support@digitalbazaar.com>.
