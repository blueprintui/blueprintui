#1.2.3
###Features
- Improved Scss configuration file, Big thanks to David Pfeiffer! :)

#1.1.3
###Features
- Added `.flex`, `.flex-fit`, and `.flex-fill` util classes

#1.0.3 Rerelease Blueprint css
- Rebranded & migrated to Blueprint CSS

###Bug Fixes
- Bleeding issue with `flex-row--gutter-between-none` corrected

#1.0.1
###Bug Fixes
- Improved npm package publish size

###Features
- Added ability to use `show` and `hide` utility classes on columns
- New documentation on VSCode snippets

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
