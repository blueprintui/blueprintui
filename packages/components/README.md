# BlueprintUI Components

Accelerate your development with flexible UI components and tools that work everywhere.

[![npm version](https://badge.fury.io/js/@blueprintui%2Fcomponents.svg)](https://badge.fury.io/js/@blueprintui%2Fcomponents)

- [Documentation](https://blueprintui.dev)
- [JavaScript CDN](https://stackblitz.com/edit/blueprintui-cdn)
- [Angular](https://stackblitz.com/edit/blueprintui-angular)
- [Vue](https://stackblitz.com/edit/blueprintui-vue)
- [React](https://stackblitz.com/edit/blueprintui-react)

## Installation

 To use components install the following,

```shell
npm install @blueprintui/components
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
  import 'https://cdn.jsdelivr.net/npm/@blueprintui/components/include/alert.js/+esm';
</script>
```

## Using a Component

Once the theme CSS is loaded components can be imported via JavaScript imports.

```javascript
import '@blueprintui/components/include/alert.js';
```

```html
<body bp-theme="modern">

  <bp-alert status="success">hello there!</bp-alert>

</body>
```
