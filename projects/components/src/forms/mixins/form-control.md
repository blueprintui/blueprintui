# Form Control Mixin - Input Type Reference Guide

This document summarizes the key behaviors and properties for each HTML input type to aid in implementing a comprehensive form control mixin for Web Components.

## Property Support Matrix

| Property      | text | number | date | time | datetime-local | week | month | range | checkbox | radio | color | file | email | url  | tel  | search | password | hidden |
| ------------- | ---- | ------ | ---- | ---- | -------------- | ---- | ----- | ----- | -------- | ----- | ----- | ---- | ----- | ---- | ---- | ------ | -------- | ------ |
| value         | ✅   | ✅     | ✅   | ✅   | ✅             | ✅   | ✅    | ✅\*  | ✅       | ✅    | ✅\*  | ✅†  | ✅    | ✅   | ✅   | ✅     | ✅       | ✅     |
| valueAsNumber | ❌   | ✅     | ✅   | ✅   | ✅             | ✅   | ✅    | ✅    | NaN      | NaN   | NaN   | NaN  | NaN   | NaN  | NaN  | NaN    | NaN      | NaN    |
| valueAsDate   | ❌   | ❌     | ✅   | ✅   | ❌‡            | ✅   | ✅    | ❌    | null     | null  | null  | null | null  | null | null | null   | null     | null   |
| checked       | ❌   | ❌     | ❌   | ❌   | ❌             | ❌   | ❌    | ❌    | ✅       | ✅    | ❌    | ❌   | ❌    | ❌   | ❌   | ❌     | ❌       | ❌     |
| files         | ❌   | ❌     | ❌   | ❌   | ❌             | ❌   | ❌    | ❌    | ❌       | ❌    | ❌    | ✅   | ❌    | ❌   | ❌   | ❌     | ❌       | ❌     |
| min           | ❌   | ✅     | ✅   | ✅   | ✅             | ✅   | ✅    | ✅    | ❌       | ❌    | ❌    | ❌   | ❌    | ❌   | ❌   | ❌     | ❌       | ❌     |
| max           | ❌   | ✅     | ✅   | ✅   | ✅             | ✅   | ✅    | ✅    | ❌       | ❌    | ❌    | ❌   | ❌    | ❌   | ❌   | ❌     | ❌       | ❌     |
| step          | ❌   | ✅     | ✅   | ✅   | ✅             | ✅   | ✅    | ✅    | ❌       | ❌    | ❌    | ❌   | ❌    | ❌   | ❌   | ❌     | ❌       | ❌     |
| minLength     | ✅   | ❌     | ❌   | ❌   | ❌             | ❌   | ❌    | ❌    | ❌       | ❌    | ❌    | ❌   | ✅    | ✅   | ✅   | ✅     | ✅       | ❌     |
| maxLength     | ✅   | ❌     | ❌   | ❌   | ❌             | ❌   | ❌    | ❌    | ❌       | ❌    | ❌    | ❌   | ✅    | ✅   | ✅   | ✅     | ✅       | ❌     |
| pattern       | ✅   | ❌     | ❌   | ❌   | ❌             | ❌   | ❌    | ❌    | ❌       | ❌    | ❌    | ❌   | ✅    | ✅   | ✅   | ✅     | ✅       | ❌     |
| placeholder   | ✅   | ✅     | ❌   | ❌   | ❌             | ❌   | ❌    | ❌    | ❌       | ❌    | ❌    | ❌   | ✅    | ✅   | ✅   | ✅     | ✅       | ❌     |
| multiple      | ❌   | ❌     | ❌   | ❌   | ❌             | ❌   | ❌    | ❌    | ❌       | ❌    | ❌    | ✅   | ✅    | ❌   | ❌   | ❌     | ❌       | ❌     |
| accept        | ❌   | ❌     | ❌   | ❌   | ❌             | ❌   | ❌    | ❌    | ❌       | ❌    | ❌    | ✅   | ❌    | ❌   | ❌   | ❌     | ❌       | ❌     |
| capture       | ❌   | ❌     | ❌   | ❌   | ❌             | ❌   | ❌    | ❌    | ❌       | ❌    | ❌    | ✅   | ❌    | ❌   | ❌   | ❌     | ❌       | ❌     |
| selection\*   | ✅   | ✅     | ❌   | ❌   | ❌             | ❌   | ❌    | ❌    | ❌       | ❌    | ❌    | ❌   | ✅    | ✅   | ✅   | ✅     | ✅       | ❌     |
| stepUp/Down   | ❌   | ✅     | ✅   | ✅   | ✅             | ✅   | ✅    | ✅    | ❌       | ❌    | ❌    | ❌   | ❌    | ❌   | ❌   | ❌     | ❌       | ❌     |
| showPicker    | ❌   | ❌     | ✅   | ✅   | ✅             | ✅   | ✅    | ❌    | ❌       | ❌    | ✅    | ❌   | ❌    | ❌   | ❌   | ❌     | ❌       | ❌     |

\* range always has a value; color always has #rrggbb value
† file value is read-only (C:\fakepath\filename)
‡ datetime-local does NOT support valueAsDate per spec \* selection = selectionStart, selectionEnd, selectionDirection, setSelectionRange

---

## Input Type Details

### text

- **Default value**: `""`
- **Value format**: Any string
- **Validation**: required, minLength, maxLength, pattern
- **Selection**: Fully supported
- **Notes**: Base type, most properties work

### number

- **Default value**: `""`
- **Value format**: Valid floating-point number string
- **valueAsNumber**: Numeric value or NaN
- **step default**: 1 (integers only unless step has decimal)
- **Validation**: required, min, max, step
- **Selection**: Supported
- **Notes**: stepUp/stepDown available; step="any" disables step validation

### date

- **Default value**: `""`
- **Value format**: `yyyy-mm-dd`
- **valueAsNumber**: Milliseconds since epoch (UTC midnight)
- **valueAsDate**: Date object (UTC midnight) or null
- **step default**: 1 (days)
- **Step unit**: Days (86,400,000 ms)
- **Validation**: required, min, max, step
- **Selection**: NOT supported (throws)
- **Notes**: Always UTC; use getUTCDate() etc.

### time

- **Default value**: `""`
- **Value format**: `HH:mm` or `HH:mm:ss` or `HH:mm:ss.sss`
- **valueAsNumber**: Milliseconds since midnight
- **valueAsDate**: Date with 1970-01-01 date portion
- **step default**: 60 (seconds)
- **Step unit**: Seconds
- **Validation**: required, min, max, step
- **Selection**: NOT supported (throws)

### datetime-local

- **Default value**: `""`
- **Value format**: `yyyy-mm-ddTHH:mm` or with seconds/ms
- **valueAsNumber**: Timestamp (local time zone interpretation)
- **valueAsDate**: null (NOT supported per spec)
- **step default**: 60 (seconds)
- **Step unit**: Seconds
- **Validation**: required, min, max, step
- **Selection**: NOT supported (throws)
- **Notes**: Represents wall clock time, no timezone

### week

- **Default value**: `""`
- **Value format**: `yyyy-Www` (e.g., 2024-W25)
- **valueAsNumber**: Timestamp of Monday midnight UTC
- **valueAsDate**: Date of Monday of the week
- **step default**: 1 (week)
- **Step unit**: Weeks
- **Step base**: -259,200,000 (1970-W01)
- **Validation**: required, min, max, step
- **Selection**: NOT supported (throws)

### month

- **Default value**: `""`
- **Value format**: `yyyy-mm` (e.g., 2024-06)
- **valueAsNumber**: Number of months since 1970-01
- **valueAsDate**: Date of first day of month
- **step default**: 1 (month)
- **Step unit**: Months
- **Validation**: required, min, max, step
- **Selection**: NOT supported (throws)

### range

- **Default value**: Midpoint of min/max (50 if 0-100)
- **Default min**: 0
- **Default max**: 100
- **Value format**: Numeric string
- **valueAsNumber**: Always valid number
- **step default**: 1
- **Validation**: None (value is sanitized/clamped)
- **Selection**: NOT supported (throws)
- **Notes**: Value is ALWAYS valid; clamped to range, rounded to step

### checkbox

- **Default value**: `"on"`
- **Primary property**: `checked` (boolean)
- **defaultChecked**: Reflects `checked` attribute
- **indeterminate**: Visual-only state
- **Validation**: required (must be checked)
- **Selection**: NOT supported
- **Form submission**: Only submits if checked
- **Notes**: click() toggles state

### radio

- **Default value**: `"on"`
- **Primary property**: `checked` (boolean)
- **defaultChecked**: Reflects `checked` attribute
- **Validation**: required (one in group must be checked)
- **Selection**: NOT supported
- **Form submission**: Only checked radio submits
- **Notes**: Same-name radios are mutually exclusive; click() cannot uncheck

### color

- **Default value**: `"#000000"`
- **Value format**: `#rrggbb` (7-char lowercase hex)
- **Validation**: None (always valid, sanitized)
- **Selection**: NOT supported
- **Notes**: Value is ALWAYS valid; normalized to lowercase; #rgb expanded to #rrggbb

### file

- **Default value**: `""`
- **Value format**: `C:\fakepath\filename` (read-only)
- **Primary property**: `files` (FileList)
- **Properties**: accept, multiple, capture, webkitdirectory
- **Validation**: required (must have file)
- **Selection**: NOT supported
- **Notes**: Value is read-only for security; can only clear with `""`

### email

- **Default value**: `""`
- **Value format**: Email address(es)
- **Validation**: required, typeMismatch (email format), minLength, maxLength, pattern, multiple (comma-separated)
- **Selection**: Supported
- **Notes**: Trims whitespace; multiple allows comma-separated list

### url

- **Default value**: `""`
- **Value format**: Absolute URL with scheme
- **Validation**: required, typeMismatch (URL format), minLength, maxLength, pattern
- **Selection**: Supported
- **Notes**: Trims whitespace; requires scheme (http://, https://, etc.)

### tel

- **Default value**: `""`
- **Value format**: Any string (no automatic validation)
- **Validation**: required, minLength, maxLength, pattern (no typeMismatch)
- **Selection**: Supported
- **Notes**: No format validation; triggers phone keyboard on mobile

### search

- **Default value**: `""`
- **Value format**: Any string
- **Validation**: required, minLength, maxLength, pattern
- **Selection**: Supported
- **Events**: `search` (non-standard, WebKit)
- **Notes**: Styled differently; may have clear button

### password

- **Default value**: `""`
- **Value format**: Any string (obscured display)
- **Validation**: required, minLength, maxLength, pattern
- **Selection**: Supported
- **Notes**: Value is accessible in JS; list attribute ignored

### hidden

- **Default value**: `""`
- **Value format**: Any string
- **Validation**: None (willValidate = false)
- **Selection**: NOT supported (throws)
- **Notes**: Always submitted; disabled attribute ignored; not rendered

---

## Validation Flags Reference

| Flag              | Triggered By                            |
| ----------------- | --------------------------------------- |
| `valueMissing`    | required + empty value                  |
| `typeMismatch`    | email/url format invalid                |
| `patternMismatch` | pattern regex doesn't match             |
| `tooLong`         | value.length > maxLength (user input)   |
| `tooShort`        | value.length < minLength (user input)   |
| `rangeUnderflow`  | value < min                             |
| `rangeOverflow`   | value > max                             |
| `stepMismatch`    | value not on step grid                  |
| `badInput`        | Browser cannot parse input              |
| `customError`     | setCustomValidity() called with message |

---

## Common Properties (All Types)

| Property          | Type            | Reflects    | Default          |
| ----------------- | --------------- | ----------- | ---------------- |
| type              | string          | ✅ type     | "text"           |
| name              | string          | ✅ name     | ""               |
| disabled          | boolean         | ✅ disabled | false            |
| required          | boolean         | ✅ required | false            |
| readOnly          | boolean         | ✅ readonly | false            |
| form              | HTMLFormElement | ❌          | null (read-only) |
| labels            | NodeList        | ❌          | [] (read-only)   |
| validity          | ValidityState   | ❌          | (read-only)      |
| validationMessage | string          | ❌          | "" (read-only)   |
| willValidate      | boolean         | ❌          | true (read-only) |

---

## Methods Reference

| Method                                    | Applies To        | Notes                                           |
| ----------------------------------------- | ----------------- | ----------------------------------------------- |
| `checkValidity()`                         | All               | Returns boolean, fires `invalid` event if false |
| `reportValidity()`                        | All               | Like checkValidity() + shows browser UI         |
| `setCustomValidity(msg)`                  | All               | Set custom error; empty string clears           |
| `select()`                                | Text-like         | Selects all text                                |
| `setSelectionRange(start, end, dir?)`     | Text-like         | Sets selection                                  |
| `setRangeText(text, start?, end?, mode?)` | Text-like         | Replaces text                                   |
| `stepUp(n?)`                              | Numeric/Date/Time | Increment by n steps                            |
| `stepDown(n?)`                            | Numeric/Date/Time | Decrement by n steps                            |
| `showPicker()`                            | Date/Time/Color   | Opens browser picker (needs user gesture)       |
| `click()`                                 | All               | Simulates click                                 |

---

## Step Defaults and Units

| Type           | Default Step | Unit    |
| -------------- | ------------ | ------- |
| number         | 1            | -       |
| range          | 1            | -       |
| date           | 1            | day     |
| time           | 60           | seconds |
| datetime-local | 60           | seconds |
| week           | 1            | week    |
| month          | 1            | month   |

---

## Implementation Notes

### Boolean Attributes

- `disabled`, `required`, `readonly`, `checked`, `multiple`, `indeterminate` (property only)
- Presence = true, absence = false
- `disabled="false"` still means disabled!

### Value vs defaultValue

- `value` property = current value
- `defaultValue` property = reflects `value` attribute
- Setting `value` property does NOT update `value` attribute
- Setting `defaultValue` DOES update `value` attribute

### checked vs defaultChecked

- Same relationship as value/defaultValue
- `checked` property = current state
- `defaultChecked` property = reflects `checked` attribute

### Form Data Inclusion

- Disabled inputs are NOT included
- Readonly inputs ARE included
- Unchecked checkboxes/radios are NOT included
- Hidden inputs ARE included (even if disabled)

### Selection Property Errors

- Date/time types throw `InvalidStateError` when accessing selection properties
- Use try/catch or type checking before accessing
