# 3.1.1
- Update license year and domain for documentation

# 3.0.0
- stable 3.0 release!
- improved performance and smaller output

# 3.0.0-beta.5
- fix legacy v2 issue for ios10

# 3.0.0-beta.4

## Features
- ie11 fallback support work

# 3.0.0-beta.1

## Performance
- improve selector loop performance

## Features
- ie11 fallback support work

# 3.0.0-beta.0

### Performance
- decrease total bundle size ~2.5kb gzip
- imporove selector performance

### Testing
- added visual regression tests

# 2.5.2

### Features
- full width utility classes with breakpoints

# 2.4.2

### Bug Fixes
- show/hide util preserve initial and inherited display state

# 2.4.1

### Bug Fixes
- fix for nested col regression when mixed with breakpoint cols

# 2.4.0

### Features
- Support more complex layouts with grid nesting

# 2.3.3

### Bug Fixes
- Enforce col 12 to be full width by default

### Features
- New dynamic offset attribute option `offset-3` `offset-4@md`

# 2.2.2

### Bug Fixes
- fixed error handling logic

# 2.2.1
### Docs
- fixed missing readme and updated changelog

# 2.2.0
### Features
- Grid Error Checking, grid will now display errors if in a invalid state https://blueprintcss.dev#errors

### Bug Fixes
- MIT license update for 2017

# 2.1.0
### Features
- Added additional spacing utilities

# 2.0.0-beta.5
- Fixed bug with child flex items with row stretch selector

# 2.0.0-beta.4
- Rename default scope to `bp-layout`
- Added `--max` utility classes back
- Fixed minor layout bugs and formatting

# 2.0.0-beta
- New scoping by attribute name conventions
- Removed no longer needed --max classes

# 1.2.4
### Bug Fixs
- Fix issue when importing `_config.scss` values not having access to `em()` functions

# 1.2.3
### Features
- Improved Scss configuration file, Big thanks to David Pfeiffer! :)

# 1.1.3
### Features
- Added `.flex`, `.flex-fit`, and `.flex-fill` util classes

# 1.0.3 Rerelease Blueprint css
- Rebranded & migrated to Blueprint CSS

### Bug Fixes
- Bleeding issue with `flex-row--gutter-between-none` corrected

# 1.0.1
### Bug Fixes
- Improved npm package publish size

### Features
- Added ability to use `show` and `hide` utility classes on columns
- New documentation on VSCode snippets

# 0.9.10
### Bug Fixes
- Removed unnecessary `justify-content` from `flex-row--stretch`
- Fix doc overflow bug on mobile devices

# 0.9.9
### Bug Fixes
- Removed extra spacing on large screens as it cause to many layout shifts

# 0.9.8
### Bug Fixes
- Fixed layout bug with `--max` classes

# 0.9.7
### Bug Fixes
- Minor class rename for fixing missing postfix class

# 0.9.6
### Breaking Changes
- Columns and Util classes updated to use responsive suffix syntax

# 0.8.6
### Bug Fixes
- Fixed Safari width layout bug

# 0.8.5
### Features
- improved documentation
- added new spacing utility classes

### Breaking Changes
- `.flex-row--full` renamed to `.flex-row--stretch` to match flexbox semantics

### Bug Fixes
- fixed `.block-center` to `.float-center` in defined in documentation

# 0.8.4
### Bug Fixes
- performance improvements bytes size of library reduced 

### Features
- partial ie9 and ie8 support, overflow bug still work in progress

# 0.8.3
### Bug Fixes
- scoped css columns to .flex-row

### Features
- new gutter modifiers added for `.flex-row`
- slimed down utility classes

### Breaking Changes
- `.first-col` & `.last-col` ordering classes renamed to `.col-first` and `.col-last`
- `.contain` classes renamed to max modifiers `.col-1--max` syntax
- `.flex-row--bottom-none` replaced with new gutter modifiers
- utility classes have been rewritten please see docs for breaking changes


- Version 0.2.2 Minor bug fixes. Fixed ie11 borderbox bug.
- Version 0.2.1 Minor bug fixes. Added new gutter removal class feature. Minor api changes.
- Version 0.1.0 Initial release

MIT License 2017
