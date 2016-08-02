[![npm version](https://badge.fury.io/js/core-flex-grid.svg)](https://badge.fury.io/js/core-flex-grid)

# Core Flex Grid
Responsive CSS Flexbox Grid

Core Flex Grid is a modern responsive mobile first CSS grid and <strong>layout library</strong> built on top of Flexbox.
Core Flex Grid is lightweight weighing at only 2kb minified and gziped.
Full IE10+ <a href="#browser-support">support</a>.
            
Core Flex Grid is a modern responsive mobile first grid built on top of Flexbox.
Core Flex Grid is very lightweight weighing at only 2kb minified and gziped.
IE10+ [support](https://splintercode.github.io/core-flex-grid/#bowser-support). Check out the [documentation](https://splintercode.github.io/core-flex-grid/).

## Latest Changes

#0.9.10
###Bug Fixes
- Removed unnecessary `justify-content` from `flex-row--stretch`
- Fix doc overflow bug on mobile devices

#0.9.9
###Bug Fixes
- Removed extra spacing on large screens as it cause to many layout shifts

#0.9.8
###Bug Fixes
- Fixed layout bug with `--max` classes

#0.9.7
###Bug Fixes
- Minor class rename for fixing missing postfix class

#0.9.6
###Breaking Changes
- Columns and Util classes updated to use responsive suffix syntax

#0.8.6
###Bug Fixes
- Fixed Safari width layout bug

#0.8.5
###Features
- improved documentation
- added new spacing utility classes

###Breaking Changes
- `.flex-row--full` renamed to `.flex-row--stretch` to match flexbox semantics

###Bug Fixes
- fixed `.block-center` to `.float-center` in defined in documentation

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
- `.contain` classes renamed to max modifiers `.col-1--max` syntax
- `.flex-row--bottom-none` replaced with new gutter modifiers
- utility classes have been rewritten please see docs for breaking changes


- Version 0.2.2 Minor bug fixes. Fixed ie11 borderbox bug.
- Version 0.2.1 Minor bug fixes. Added new gutter removal class feature. Minor api changes.
- Version 0.1.0 Initial release

MIT License 2015
