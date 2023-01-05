# @blueprintui/typewriter (beta)

[![npm version](https://badge.fury.io/js/@blueprintui%2Ftypewriter.svg)](https://badge.fury.io/js/@blueprintui%2Ftypewriter)

- [Documentation](https://blueprintui.dev/typewriter)
- [Stackblitz Demo](https://stackblitz.com/edit/blueprintui-typewriter)

## Simple and lightweight key navigation utilities and components.

```bash
npm install @blueprintui/typewriter
```

## Keylist

```html
<script type="module">
  import 'https://cdn.jsdelivr.net/npm/@blueprintui/typewriter@0.0.0/include/keylist.js/+esm';
</script>
<bp-keylist loop>
  <button>1</button>
  <button>2</button>
  <button>3</button>
  <button>4</button>
</bp-keylist>
```

## Keylist Block

Keylist has three directions: `inline`, `block`, and `all`. The default is `inline`. The `block` direction is useful for creating a vertical list of items. The `loop` attribute will loop the list of items when the user reaches the end of the list.

```html
<script type="module">
  import 'https://cdn.jsdelivr.net/npm/@blueprintui/typewriter@0.0.0/include/keylist.js/+esm';
</script>
<bp-keylist loop direction="block">
  <button>1</button>
  <button>2</button>
  <button>3</button>
  <button>4</button>
</bp-keylist>
```

## Keygrid

Keygrid follows the aria [grid navitation](https://w3c.github.io/aria-practices/#gridNav_focus) patterns. Keygrid computes the number of columns by computing the number of items from the CSS property \`grid-template-columns\`. If the columns are dynamic you can explicity set the column count `<bp-keygrid columns="4">`.

```html
<script type="module">
  import 'https://cdn.jsdelivr.net/npm/@blueprintui/typewriter@0.0.0/include/keygrid.js/+esm';
</script>
<bp-keygrid columns="4">
  <button>1</button>
  <button>2</button>
  <button>3</button>
  <button>4</button>
</bp-keygrid>
```