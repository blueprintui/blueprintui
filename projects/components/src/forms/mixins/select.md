# Form Control Mixin - Select/Option Element Reference Guide

This document summarizes the key behaviors and properties for HTMLSelectElement, HTMLOptionElement, and HTMLOptGroupElement to aid in implementing form control mixins for Web Components.

---

## HTMLSelectElement

### Properties

| Property            | Type                  | Reflects        | Default      | Writable | Notes                                |
| ------------------- | --------------------- | --------------- | ------------ | -------- | ------------------------------------ |
| `type`              | string                | ❌              | "select-one" | ❌       | "select-multiple" when multiple=true |
| `name`              | string                | ✅ name         | ""           | ✅       |                                      |
| `value`             | string                | ❌              | ""           | ✅       | First selected option's value        |
| `selectedIndex`     | number                | ❌              | -1 or 0      | ✅       | -1 if none selected                  |
| `options`           | HTMLOptionsCollection | ❌              | []           | ✅\*     | \*Can assign via index               |
| `selectedOptions`   | HTMLCollection        | ❌              | []           | ❌       | Live collection                      |
| `length`            | number                | ❌              | 0            | ✅       | Can truncate/extend                  |
| `multiple`          | boolean               | ✅ multiple     | false        | ✅       |                                      |
| `size`              | number                | ✅ size         | 0            | ✅       | 0 means browser default (1 or 4)     |
| `disabled`          | boolean               | ✅ disabled     | false        | ✅       |                                      |
| `required`          | boolean               | ✅ required     | false        | ✅       |                                      |
| `autocomplete`      | string                | ✅ autocomplete | ""           | ✅       |                                      |
| `form`              | HTMLFormElement       | ❌              | null         | ❌       | Read-only                            |
| `labels`            | NodeList              | ❌              | []           | ❌       | Read-only                            |
| `validity`          | ValidityState         | ❌              | -            | ❌       | Read-only                            |
| `validationMessage` | string                | ❌              | ""           | ❌       | Read-only                            |
| `willValidate`      | boolean               | ❌              | true         | ❌       | false when disabled                  |

### Methods

| Method                | Signature                             | Notes                             |
| --------------------- | ------------------------------------- | --------------------------------- |
| `add()`               | `add(element, before?)`               | Adds option/optgroup              |
| `remove()`            | `remove(index)`                       | Removes option at index           |
| `item()`              | `item(index): HTMLOptionElement?`     | Get option by index               |
| `namedItem()`         | `namedItem(name): HTMLOptionElement?` | Get by id/name                    |
| `checkValidity()`     | `(): boolean`                         | Returns validity, fires `invalid` |
| `reportValidity()`    | `(): boolean`                         | Shows browser validation UI       |
| `setCustomValidity()` | `(message: string): void`             | Set custom error                  |
| `showPicker()`        | `(): void`                            | Opens dropdown (needs gesture)    |

### Value Behavior

```javascript
// value returns first selected option's value
select.value; // => first selected option.value or ""

// Setting value selects matching option
select.value = 'optionValue'; // Selects matching option
select.value = 'nonexistent'; // selectedIndex becomes -1, value becomes ""

// Option value resolution:
// 1. If option has value attribute, use it
// 2. Otherwise, use option.textContent
```

### selectedIndex Behavior

```javascript
// Returns index of first selected option, or -1
select.selectedIndex; // => 0, 1, 2, ... or -1

// Setting selects that option and deselects others (in single select)
select.selectedIndex = 2; // Selects third option
select.selectedIndex = -1; // Deselects all
select.selectedIndex = 999; // Deselects all (invalid index)
```

### Multiple Selection

```javascript
// Enable multiple selection
select.multiple = true;

// Now multiple options can be selected
select.options[0].selected = true;
select.options[2].selected = true;

// selectedOptions contains all selected
select.selectedOptions.length; // => 2

// value still returns first selected
select.value; // => first selected option's value

// Form submission includes all selected values
// FormData.getAll('name') returns array
```

### Default Selection Rules

| Scenario                    | Single Select                         | Multiple Select      |
| --------------------------- | ------------------------------------- | -------------------- |
| No options                  | selectedIndex = -1                    | selectedIndex = -1   |
| Options, none marked        | selectedIndex = 0 (auto-select first) | selectedIndex = -1   |
| Option with `selected` attr | That option selected                  | That option selected |
| Multiple `selected` attrs   | Last one wins                         | All selected         |

### Validation

| Constraint | Condition               | validity flag  |
| ---------- | ----------------------- | -------------- |
| Required   | required=true, value="" | `valueMissing` |
| Custom     | setCustomValidity(msg)  | `customError`  |

**Note**: The "placeholder" pattern (first option with `value=""`) triggers `valueMissing` when `required=true`.

---

## HTMLOptionElement

### Constructor

```javascript
new Option(); // Empty option
new Option(text); // text and value = text
new Option(text, value); // text and value
new Option(text, value, defaultSelected); // + selected attribute
new Option(text, value, defaultSelected, selected); // + selected property
```

### Properties

| Property          | Type            | Reflects    | Default | Writable | Notes                          |
| ----------------- | --------------- | ----------- | ------- | -------- | ------------------------------ |
| `value`           | string          | ✅ value    | ""      | ✅       | Falls back to textContent      |
| `text`            | string          | ❌          | ""      | ✅       | Text content (not innerHTML)   |
| `selected`        | boolean         | ❌          | false   | ✅       | Current selection state        |
| `defaultSelected` | boolean         | ✅ selected | false   | ✅       | Initial state                  |
| `disabled`        | boolean         | ✅ disabled | false   | ✅       | Inherits from optgroup         |
| `index`           | number          | ❌          | 0       | ❌       | Position in options collection |
| `label`           | string          | ✅ label    | ""      | ✅       | Falls back to text             |
| `form`            | HTMLFormElement | ❌          | null    | ❌       | Parent select's form           |

### Value Resolution

```javascript
// value property behavior:
<option value="explicit">Text</option>  // value = "explicit"
<option>Just Text</option>              // value = "Just Text"
<option value="">Empty Value</option>   // value = ""

// Setting value always sets the attribute
option.value = 'new'  // Sets value attribute
```

### selected vs defaultSelected

```javascript
// defaultSelected reflects the 'selected' HTML attribute
<option selected>A</option>;
option.defaultSelected; // true
option.hasAttribute('selected'); // true

// selected reflects current state (not attribute)
option.selected = true; // Does NOT add 'selected' attribute
option.selected = false; // Does NOT remove 'selected' attribute

// They're independent after page load / user interaction
option.setAttribute('selected', ''); // Sets defaultSelected
option.selected = false; // Changes current state only
```

### Index Property

```javascript
// Read-only, reflects position in parent select's options
select.options[0].index // 0
select.options[1].index // 1

// Options in optgroups still have sequential indices
<select>
  <optgroup>
    <option>A</option>  <!-- index: 0 -->
    <option>B</option>  <!-- index: 1 -->
  </optgroup>
  <option>C</option>    <!-- index: 2 -->
</select>

// Orphan options have index 0
const orphan = new Option('text')
orphan.index // 0
```

---

## HTMLOptGroupElement

### Properties

| Property   | Type    | Reflects    | Default | Writable |
| ---------- | ------- | ----------- | ------- | -------- |
| `label`    | string  | ✅ label    | ""      | ✅       |
| `disabled` | boolean | ✅ disabled | false   | ✅       |

### Disabled Inheritance

```javascript
// When optgroup is disabled, all child options are disabled
<optgroup label="Group" disabled>
  <option>A</option> // option.disabled === true
  <option>B</option> // option.disabled === true
</optgroup>

// Disabled options cannot be selected
```

---

## Form Submission

### Single Select

```javascript
// Only the selected option's value is submitted
<select name="choice">
  <option value="a">A</option>
  <option value="b" selected>
    B
  </option>
</select>

// FormData: { choice: "b" }
```

### Multiple Select

```javascript
// All selected values are submitted
<select name="choices" multiple>
  <option value="a" selected>
    A
  </option>
  <option value="b">B</option>
  <option value="c" selected>
    C
  </option>
</select>

// FormData: choices=a&choices=c
// formData.getAll('choices') => ['a', 'c']
```

### Exclusions

- **Disabled select**: Not submitted
- **Select without name**: Not submitted
- **No selection**: Submits empty string or nothing (depends on browser)

---

## Events

| Event     | Fires When             | Notes                             |
| --------- | ---------------------- | --------------------------------- |
| `change`  | User changes selection | NOT on programmatic changes       |
| `input`   | User changes value     | NOT on programmatic changes       |
| `invalid` | Validation fails       | From checkValidity/reportValidity |

---

## Key Differences from Input

| Aspect              | Input                           | Select                              |
| ------------------- | ------------------------------- | ----------------------------------- |
| Value source        | Direct property                 | Derived from selected option        |
| Multi-value         | Only file input (multiple)      | multiple attribute                  |
| Options             | Via datalist (suggestions only) | Direct children                     |
| Type property       | User-settable                   | Derived from multiple               |
| Required validation | value === ""                    | First option with value="" selected |

---

## Implementation Notes for Web Components

### Options Collection Management

```typescript
// Options should be a live HTMLOptionsCollection
get options(): HTMLOptionsCollection {
  // Return collection of <option> descendants
}

// Support bracket notation
element[0] // Same as element.options[0]
element['optionName'] // Same as element.namedItem('optionName')

// Support length assignment
set length(value: number) {
  // Truncate or pad with empty options
}
```

### Value/SelectedIndex Sync

```typescript
// Setting value should update selectedIndex
set value(val: string) {
  const index = this.findOptionIndex(opt => opt.value === val);
  this.selectedIndex = index; // -1 if not found
}

// Setting selectedIndex should update value
set selectedIndex(index: number) {
  // Deselect all, select option at index
  // Update internal value cache
}
```

### Single vs Multiple Selection

```typescript
set selected(value: boolean) {
  if (!this.parentSelect?.multiple && value) {
    // Deselect siblings first
    for (const opt of this.parentSelect.options) {
      if (opt !== this) opt.selected = false;
    }
  }
  this._selected = value;
}
```

### Placeholder Detection

```typescript
// First option with empty value is placeholder
get hasPlaceholder(): boolean {
  const first = this.options[0];
  return first && first.value === '';
}

// For required validation
get valueMissing(): boolean {
  return this.required &&
         this.selectedIndex === 0 &&
         this.hasPlaceholder;
}
```

---

## Browser Compatibility Notes

1. **size default**: Spec says 0, browsers render as 1 (or 4 if multiple)
2. **selectedIndex auto-select**: Single select auto-selects first option
3. **disabled optgroup**: Options inherit disabled state
4. **showPicker()**: Requires user gesture, may throw
5. **Option constructor**: Fourth param (selected) doesn't work in all browsers

---

## Comparison: Native vs Custom Element

| Feature            | Native Select  | Custom Element Challenge      |
| ------------------ | -------------- | ----------------------------- |
| Dropdown UI        | Browser-native | Must implement or use popover |
| Keyboard nav       | Built-in       | Must implement                |
| Form integration   | Automatic      | Needs ElementInternals        |
| Options collection | Built-in       | Must maintain manually        |
| Styling            | Limited        | Full control                  |
| Searchable         | Browser varies | Can implement                 |
