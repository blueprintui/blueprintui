<h1><img src="https://blueprintui.dev/assets/images/logo-neutral.svg" style="width: 350px" alt="BlueprintUI" /></h1>

#### A collection of tools and UI components for building Web UIs that work everywhere.

- Easy to use Web Components
- Works in any Framework (Angular, React, Vue...)
- Responsive and Customizable Themes
- Layout, Typography, and Icons Utilites


| Package       | Downloads     | CI Status     | CDN            |
| ------------- | ------------- | --------------| -------------- |
| [![npm version](https://img.shields.io/npm/v/@blueprintui/components?color=%2334D058&label=%40blueprintui%2Fcomponents)](https://www.npmjs.com/package/@blueprintui/components) | [![](https://img.shields.io/npm/dm/@blueprintui/components?color=%2334D058)](https://www.jsdelivr.com/package/npm/@blueprintui/components) | ![Build](https://github.com/blueprintui/blueprintui/actions/workflows/release.yml/badge.svg) | [![](https://img.shields.io/jsdelivr/npm/hm/@blueprintui/components?color=%2334D058)](https://www.jsdelivr.com/package/npm/@blueprintui/components) |
| [![npm version](https://img.shields.io/npm/v/@blueprintui/icons?color=%2334D058&label=%40blueprintui%2Ficons)](https://www.npmjs.com/package/@blueprintui/icons) | [![](https://img.shields.io/npm/dm/@blueprintui/icons?color=%2334D058)](https://www.jsdelivr.com/package/npm/@blueprintui/icons) | ![Build](https://github.com/blueprintui/blueprintui/actions/workflows/release.yml/badge.svg) | [![](https://img.shields.io/jsdelivr/npm/hm/@blueprintui/icons?color=%2334D058)](https://www.jsdelivr.com/package/npm/@blueprintui/icons) |
| [![npm version](https://img.shields.io/npm/v/@blueprintui/crane?color=%2334D058&label=%40blueprintui%2Fcrane)](https://www.npmjs.com/package/@blueprintui/crane) | [![](https://img.shields.io/npm/dm/@blueprintui/crane?color=%2334D058)](https://www.jsdelivr.com/package/npm/@blueprintui/crane) | ![Build](https://github.com/blueprintui/blueprintui/actions/workflows/release.yml/badge.svg) | [![](https://img.shields.io/jsdelivr/npm/hm/@blueprintui/crane?color=%2334D058)](https://www.jsdelivr.com/package/npm/@blueprintui/crane) |
| [![npm version](https://img.shields.io/npm/v/@blueprintui/typewriter?color=%2334D058&label=%40blueprintui%2Ftypewriter)](https://www.npmjs.com/package/@blueprintui/typewriter) | [![](https://img.shields.io/npm/dm/@blueprintui/typewriter?color=%2334D058)](https://www.jsdelivr.com/package/npm/@blueprintui/typewriter) | ![Build](https://github.com/blueprintui/blueprintui/actions/workflows/release.yml/badge.svg) | [![](https://img.shields.io/jsdelivr/npm/hm/@blueprintui/typewriter?color=%2334D058)](https://www.jsdelivr.com/package/npm/@blueprintui/typewriter) |
| [![npm version](https://img.shields.io/npm/v/@blueprintui/layout?color=%2334D058&label=%40blueprintui%2Flayout)](https://www.npmjs.com/package/@blueprintui/layout) | [![](https://img.shields.io/npm/dm/@blueprintui/layout?color=%2334D058)](https://www.jsdelivr.com/package/npm/@blueprintui/layout) | ![Build](https://github.com/blueprintui/blueprintui/actions/workflows/release.yml/badge.svg) |  |
| [![npm version](https://img.shields.io/npm/v/@blueprintui/themes?color=%2334D058&label=%40blueprintui%2Fthemes)](https://www.npmjs.com/package/@blueprintui/themes) | [![](https://img.shields.io/npm/dm/@blueprintui/themes?color=%2334D058)](https://www.jsdelivr.com/package/npm/@blueprintui/themes) | ![Build](https://github.com/blueprintui/blueprintui/actions/workflows/release.yml/badge.svg) |  |
| [![npm version](https://img.shields.io/npm/v/@blueprintui/typography?color=%2334D058&label=%40blueprintui%2Ftypography)](https://www.npmjs.com/package/@blueprintui/typography) | [![](https://img.shields.io/npm/dm/@blueprintui/typography?color=%2334D058)](https://www.jsdelivr.com/package/npm/@blueprintui/typography) | ![Build](https://github.com/blueprintui/blueprintui/actions/workflows/release.yml/badge.svg) |  |

## Documentation

- [Documentation](https://blueprintui.dev)
- [JavaScript CDN](https://stackblitz.com/edit/blueprintui-cdn)
- [Angular](https://stackblitz.com/edit/blueprintui-angular)
- [Vue](https://stackblitz.com/edit/blueprintui-vue)
- [React](https://stackblitz.com/edit/blueprintui-react)


## Installation

Blueprint UI components are built as Web Components. This enables them to work in a variety of frameworks and libraries. Blueprint UI is split into several packages that can be used independently. To use components its install the following,

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
@import '@blueprintui/themes/dark/index.min.css';
```

or

```html
<link rel="stylesheet" href="@blueprintui/themes/index.min.css"> 
<link rel="stylesheet" href="@blueprintui/themes/dark/index.min.css"> 
```

## CDN

Blueprint UI Components can be used via CDNs for fast and easy prototyping.

```html
<link rel="stylesheet" href="https://unpkg.com/@blueprintui/themes/index.min.css">
<link rel="stylesheet" href="https://unpkg.com/@@blueprintui/themes/dark/index.min.css">

<script type="module">
  import 'https://cdn.jsdelivr.net/npm/@blueprintui/components/include/alert.js/+esm';
</script>
```

## Using a Component

Once the theme CSS is loaded, components can be imported via JavaScript imports.

```javascript
import '@blueprintui/components/include/alert.js';
```

```html
<body bp-theme=" { theme: 'dark' });">

  <bp-alert status="success">hello there!</bp-alert>

</body>
```
