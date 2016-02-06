[![npm version](https://badge.fury.io/js/core-flex-grid.svg)](https://badge.fury.io/js/core-flex-grid)

# Core Flex Grid v0.8.4
Responsive CSS Flexbox Grid

Core Flex Grid is a modern responsive mobile first grid built on top of Flexbox.
Core Flex Grid is very lightweight weighing at only 1.5kb minified and gziped.
IE10+ [support](http://caniuse.com/#search=flexbox). Check out the [documentation](https://splintercode.github.io/core-flex-grid/).

## Latest Changes

#0.8.4
###Bug Fixes
- performance improvements bytes size of library reduced 

###Features
- partial ie9 and ie8 support, overflow bug still work in progress

#0.8.3
###Bug Fixes
- scoped css columns to .flex-row

###Features
- new gutter modifiers added for `.flex-row`
- slimed down utility classes

###Breaking Changes
- `.first-col` & `.last-col` ordering classes renamed to `.col-first` and `.col-last`
- `.contain` classes have been renamed to max modifiers `.col-1--max` syntax
- `.flex-row--bottom-none` has been replace with new gutter modifiers
- utility classes have been rewritten please see docs for breaking changes


- Version 0.2.2 Minor bug fixes. Fixed ie11 borderbox bug.
- Version 0.2.1 Minor bug fixes. Added new gutter removal class feature. Minor api changes.
- Version 0.1.0 Initial release

MIT License 2015
