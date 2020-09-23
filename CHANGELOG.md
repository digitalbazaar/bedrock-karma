# bedrock-karma ChangeLog

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
