# bedrock-karma ChangeLog

## 7.0.1 - 2024-03-14

### Changed
- Limit distributed files.

## 7.0.0 - 2024-03-14

### Changed
- Fail on webpack error.

## 6.2.0 - 2024-02-29

### Changed
- Relicense under the Apache-2.0 license.

## 6.1.0 - 2023-10-16

### Added
- Add `@vue/compiler-sfc@3.3.4` dep.

## 6.0.0 - 2022-07-13

### Changed
- **BREAKING**: Updated dependencies to support vue 3, vue 2 no longer supported.

## 5.1.0 - 2022-05-12

### Fixed
- Change `run_complete` to fail on non-zero `exitCode`. This addresses a
  problem where the `@bedrock/test` `pass` field was not being set to `false`
  in the case where karma failed before any tests were run. In such a case,
  there was a failure exit code but no tests ran so the failure count was zero.

### Changed
- Added `@bedrock/core` config object field to help set fallbacks:
  `config.karma.config.webpack.resolve.fallback`
- Refactor to use more modern karma API.
- Update babel config that matches `@bedrock/webpack`:
  - Add minor `corejs` version.
  - Use `bugfixes`.
  - Add target of `defaults, not IE 11`. This helps with new `BigInt` issues.

## 5.0.0 - 2022-04-29

### Changed
- **BREAKING**: Update peer deps:
  - `@bedrock/core@6`
  - `@bedrock/test@8`.

## 4.0.0 - 2022-04-22

### Changed
- Update dependencies.
- Update to more modern webpack usage.

### Added
- Add `@bedrock/test` `test` command framework targets:
  - `--framework karma-coverage`: Run coverage with `text`, `text-summary`,
    `lcovonly`, and local `html` reports.
  - `--framework karma-coverage-ci`: Run coverage with `text`, `text-summary`,
    and `lcovonly` reports.

### Removed
- **BREAKING**: Remove `lib/coverageConfig.js`. Use new `--framework` targets.

## 3.1.2 - 2022-04-10

### Fixed
- Wait to rebind karma server port as `close` event
  does not mean the port has been unbound.

## 3.1.1 - 2022-04-05

### Fixed
- Ensure `node_modules` is excluded from code coverage.

## 3.1.0 - 2022-04-05

### Changed
- Output `text` coverage report by default.

## 3.0.1 - 2022-04-05

### Fixed
- Fix code coverage; require command line import of
  `coverageConfig.js`.

## 3.0.0 - 2022-04-05

### Changed
- **BREAKING**: Rename package to `@bedrock/karma`.
- **BREAKING**: Convert to module (ESM).
- **BREAKING**: Remove default export.
- **BREAKING**: Require node 14.x.

## 2.4.0 - 2022-03-30

### Changed
- Update to `karma@6` to address security concerns and very old karma
  dependency. Only breaking changes related to this are dropping unused
  node 6 and 8 support and unused bluebird promises features.

## 2.3.0 - 2022-03-30

### Changed
- Update peer deps:
  - `bedrock@4.5`
  - `bedrock-test@6.1.0`.
- Update internals to use esm style and use `esm.js` to
  transpile to CommonJS.

## 2.2.0 - 2020-09-23

### Changed
- Change the order of reports to avoid duplicate console logging.

## 2.1.0 - 2020-04-21

### Added
- Implement coverage for bedrock-web modules.

## 2.0.0 - 2020-02-19

### Changed
- **BREAKING**: Configure for use with bedrock@3 and bedrock-test@5.

## 1.4.0 - 2019-04-09

### Changed
- The karma server now uses https.

## 1.3.0 - 2019-04-09

### Changed
- Decrease webpack build times via the following changes to the karma webpack
  configuration:
  - Change mode to 'development'.
  - Removing source map options.
  - Remove babel-loader.

## 1.2.0 - 2019-02-28

### Added
- Add ability to transpile object spread operators.

## 1.1.0 - 2018-09-21

### Added
- Add Vue.js SFC compiler to enable testing Vue components.

## 1.0.3 - 2018-09-09

### Fixed
- Add missing `regenerator-runtime` for use of `async`
  in mocha tests.

## 1.0.2 - 2018-09-09

### Fixed
- Use `http` module wrapper to close bound server handles
  that cannot be reused when running a cluster worker.

## 1.0.1 - 2018-09-09

### Changed
- Upgrade to latest karma.

### Fixed
- List `bedrock` as a peer dependency.

## 1.0.0 - 2018-06-14

## 0.1.0 - 2018-06-14

### Added
- Added core files.

- See git history for changes.
