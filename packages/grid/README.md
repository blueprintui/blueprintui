# BlueprintUI Grid

Accelerate your development with a flexible UI datagrid that works everywhere.


[![npm version](https://badge.fury.io/js/@blueprintui%2Fgrid.svg)](https://badge.fury.io/js/@blueprintui%2Fgrid)

- [Documentation](https://blueprintui.dev/docs/grid)
- [JavaScript CDN](https://stackblitz.com/edit/blueprintui-grid-cdn)

## Installation

 To use the datagrid install the following,

```shell
npm install @blueprintui/grid @blueprintui/themes
```

Optional packages for layout and typography utilities are also available.

```shell
npm install @blueprintui/layout @blueprintui/typography
```

## CSS

To use components the base theme CSS file must be loaded into the page. This can be done via a CSS import or HTML link.

```css
@import '@blueprintui/themes/index.min.css';
@import '@blueprintui/themes/modern/index.min.css';
```

or

```html
<link rel="stylesheet" href="@blueprintui/themes/index.min.css"> 
<link rel="stylesheet" href="@blueprintui/themes/modern/index.min.css"> 
```

## CDN

Blueprint UI Components can be used via CDNs for fast and easy prototyping.

```html
<link rel="stylesheet" href="https://unpkg.com/@blueprintui/themes/index.min.css">
<link rel="stylesheet" href="https://unpkg.com/@@blueprintui/themes/modern/index.min.css">

<script type="module">
  import 'https://cdn.jsdelivr.net/npm/@blueprintui/grid/include/core.js/+esm';
</script>
```

## Using a Component

Once the theme CSS is loaded the grid can be imported via JavaScript imports.

```javascript
import '@blueprintui/grid/include/core.js';
import '@blueprintui/grid/include/keynav.js';
```

```html
<body bp-theme="modern">

  <bp-grid>
    <bp-grid-header>
      <bp-grid-column>Column</bp-grid-column>
      <bp-grid-column>Column</bp-grid-column>
      <bp-grid-column>Column</bp-grid-column>
      <bp-grid-column>Column</bp-grid-column>
    </bp-grid-header>

    <bp-grid-row>
      <bp-grid-cell>Cell</bp-grid-cell>
      <bp-grid-cell>Cell</bp-grid-cell>
      <bp-grid-cell>Cell</bp-grid-cell>
      <bp-grid-cell>Cell</bp-grid-cell>
    </bp-grid-row>
  </bp-grid>

</body>
```
