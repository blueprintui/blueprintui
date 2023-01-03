# @blueprintui/typewriter

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
  import '@blueprintui/typewriter/include/keylist.js';
</script>
<bp-keylist loop direction="inline">
  <button>1</button>
  <button>2</button>
  <button>3</button>
  <button>4</button>
</bp-keylist>
```

## Keylist Block

```html
<script type="module">
  import '@blueprintui/typewriter/include/keylist.js';
</script>
<bp-keylist loop direction="block">
  <button>1</button>
  <button>2</button>
  <button>3</button>
  <button>4</button>
</bp-keylist>
```

## Keygrid

```html
<script type="module">
  import '@blueprintui/typewriter/include/keygrid.js';
</script>
<bp-keygrid columns="4">
  <button>1</button>
  <button>2</button>
  <button>3</button>
  <button>4</button>
</bp-keygrid>
```