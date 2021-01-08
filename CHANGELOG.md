**helpers /**
[Readme](https://github.com/kisbox/helpers/blob/master/README.md)
• [Changelog](https://github.com/kisbox/helpers/blob/master/CHANGELOG.md)

# Changelog

All notable changes to this project will be documented in this file.

This project adheres to **[Semantic
Versioning](https://semver.org/spec/v2.0.0.html)**. Version syntax is
`{major}.{minor}.{patch}`, where a field bump means:

- **Patch**: The release contains bug fixes.
- **Minor**: The release contains backward-compatible changes.
- **Major**: The release contains compatibility-breaking changes.

**Remember:** Both micro and minor releases are guaranteed to respect
backward-compatibility and can be updated to without risk of breakage. For major
releases, please check this changelog before upgrading.

## 1.0.0-beta.19 - 2021-01-08

### Added

- Logic: Add keach().
- Logic: Add sync().

## 1.0.0-beta.17 - 2020-11-07

### Added

- Logic: Add array helpers.

### Changed

- Logic: Makes `callback` optional in dispatch().

### Fixed

- Logic: Fix delay (property.js).

## 1.0.0-beta.11 - 2020-06-14

### Changed

- Meta: Update .browserslistrc.
- Meta: Blacklist irrelevant polyfills.

### Fixed

- API: `isNode()` must returns a Boolean.

## 1.0.0-beta.10 - 2020-06-07

### Breaking

- API: Breaking change: flatten the module.

## 1.0.0-beta.8 - 2020-05-17

### Fixed

- Logic: Fix `xeach()` handling of nullish values.

## 1.0.0-beta.7 - 2020-05-02

### Fixed

- Logic: Fix `isInstance()` (any).
- Logic: Fix `noThrow` & `noError`. It should pass back returned value in case
  of success.

## 1.0.0-beta.6 - 2020-04-18

### Changed

- Logic: `error.noThrow()` returns errors.

### Fixed

- Documentation: Fix `function.xassoc()` documentation.
- Logic: `xassoc()` ignores `undefined` keys.

## 1.0.0-beta.4 - 2020-04-04

### Fixed

- Logic: Fix \$memoizer default `generator`. It was meant to create an empty
  object.

## 1.0.0-beta.3 - 2020-03-28

### Changed

- API: Add `helpers` to shortcuts.

## 1.0.0-beta.2 - 2020-03-07

### Breaking

- Logic: Make property.setProperty() consistent.
- Logic: Move several `any` helpers to `@kisbox/utils.type`.
- Logic: Replace `any.isObject()` by its opposite `any.isAtom`.

### Added

- Logic: Add `xeach`, `xmap` and `xassoc`.
- Logic: Add 'any.isInstance()'.

### Fixed

- Logic: Fix `any.isArrayLike().

## 1.0.0-beta.1 - 2020-02-29

### Breaking

- Logic: Rewrite `function.dispatch()`.

### Added

- Logic: Add `any.isArrayLike()`.

### Fixed

- Logic: Fix `any.isAtom()`.

## 1.0.0-beta.0 - 2020-02-09

Initial release.
