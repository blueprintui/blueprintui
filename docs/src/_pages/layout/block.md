---
title: Block
description: 
keywords:
meta-tags:
---

Block layouts define a collection of elements stacked vertically. Alignemnt of items can be controlled as a group or independently for each item.

<div bp-layout="block gap:sm" demo>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>

```html
<div bp-layout="block gap:sm">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>
```

## Gap

Gaps allow control of white space between layout items. Gaps can be set via t-shirt sizes, `xs`, `sm`, `md`, `lg`, `xl`.

### Extra Small

<div bp-layout="block gap:xs" demo>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>

```html
<div bp-layout="block gap:xs">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>
```

### Small

<div bp-layout="block gap:sm" demo>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>

```html
<div bp-layout="block gap:sm">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>
```

### Medium

<div bp-layout="block gap:md" demo>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>

```html
<div bp-layout="block gap:md">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>
```

### Large

<div bp-layout="block gap:lg" demo>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>

```html
<div bp-layout="block gap:lg">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>
```

### Extra Large

<div bp-layout="block gap:xl" demo>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>

```html
<div bp-layout="block gap:xl">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>
```

## Align

Aligns enable control of the item Align within the layout container. Block Aligns run along the vertical axis and inline Aligns run ont the horizontal axis.

### Center

<div bp-layout="block gap:sm center" style="min-height: 300px" demo>
  <div>1</div>
  <div>2</div>
</div>

```html
<div bp-layout="block gap:sm center" style="min-height: 300px">
  <div>1</div>
  <div>2</div>
</div>
```

### Block Start

<div bp-layout="block gap:sm block:start" style="min-height: 300px" demo>
  <div>1</div>
  <div>2</div>
</div>

```html
<div bp-layout="block gap:sm block:start" style="min-height: 300px">
  <div>1</div>
  <div>2</div>
</div>
```

### Block End

<div bp-layout="block gap:sm block:end" style="min-height: 300px" demo>
  <div>1</div>
  <div>2</div>
</div>

```html
<div bp-layout="block gap:sm block:end" style="min-height: 300px">
  <div>1</div>
  <div>2</div>
</div>
```

### Block Center

<div bp-layout="block gap:sm block:center" style="min-height: 300px" demo>
  <div>1</div>
  <div>2</div>
</div>

```html
<div bp-layout="block gap:sm block:center" style="min-height: 300px">
  <div>1</div>
  <div>2</div>
</div>
```

### Inline Start

<div bp-layout="block gap:sm inline:start" demo>
  <div>1</div>
  <div>2</div>
</div>

```html
<div bp-layout="block gap:sm inline:start">
  <div>1</div>
  <div>2</div>
</div>
```

### Inline End

<div bp-layout="block gap:sm inline:end" demo>
  <div>1</div>
  <div>2</div>
</div>

```html
<div bp-layout="block gap:sm inline:end">
  <div>1</div>
  <div>2</div>
</div>
```

### Inline Center

<div bp-layout="block gap:sm inline:center" demo>
  <div>1</div>
  <div>2</div>
</div>

```html
<div bp-layout="block gap:sm inline:center">
  <div>1</div>
  <div>2</div>
</div>
```


## Item Align

Item Align similar to Aligns allow individual items to align separately from the rest of the items within the layout group.

### Item Align - Center

<div bp-layout="block gap:sm" style="min-height: 200px" demo>
  <div bp-layout="center">1</div>
</div>

```html
<div bp-layout="block gap:sm">
  <div bp-layout="center">1</div>
</div>
```

### Block Start

<div bp-layout="block gap:sm block:end" style="min-height: 350px" demo>
  <div bp-layout="block:start">1</div>
  <div>2</div>
  <div>3</div>
</div>

```html
<div bp-layout="block gap:sm block:end" style="min-height: 350px">
  <div bp-layout="block:start">1</div>
  <div>2</div>
  <div>3</div>
</div>
```

### Block End

<div bp-layout="block gap:sm" style="min-height: 350px" demo>
  <div>1</div>
  <div>2</div>
  <div bp-layout="block:end">3</div>
</div>

```html
<div bp-layout="block gap:sm" style="min-height: 350px">
  <div>1</div>
  <div>2</div>
  <div bp-layout="block:end">3</div>
</div>
```

### Block Center

<div bp-layout="block gap:sm" style="min-height: 250px" demo>
  <div bp-layout="block:center">1</div>
</div>

```html
<div bp-layout="block gap:sm" style="min-height: 250px">
  <div bp-layout="block:center">1</div>
</div>
```

### Inline Start

<div bp-layout="block gap:sm inline:end" demo>
  <div>1</div>
  <div bp-layout="inline:start">2</div>
  <div>3</div>
</div>

```html
<div bp-layout="block gap:sm">
  <div>1</div>
  <div bp-layout="inline:start">2</div>
  <div>3</div>
</div>
```

### Inline Center

<div bp-layout="block gap:sm" demo>
  <div>1</div>
  <div bp-layout="inline:center">2</div>
  <div>3</div>
</div>

```html
<div bp-layout="block gap:sm">
  <div>1</div>
  <div bp-layout="inline:center">2</div>
  <div>3</div>
</div>
```

### Inline End

<div bp-layout="block gap:sm" demo>
  <div>1</div>
  <div bp-layout="inline:end">2</div>
  <div>3</div>
</div>

```html
<div bp-layout="block gap:sm">
  <div>1</div>
  <div bp-layout="inline:end">2</div>
  <div>3</div>
</div>
```

## Stretch

Stretch Aligns allow items to fill the space within the parent layout container.

### Stretch - Inline

<div bp-layout="block gap:sm align:inline-stretch" demo>
  <div>1</div>
  <div>2</div>
</div>

```html
<div bp-layout="block gap:sm align:inline-stretch">
  <div>1</div>
  <div>2</div>
</div>
```


### Stretch - Block

<div bp-layout="block gap:sm align:block-stretch" style="min-height: 350px" demo>
  <div>1</div>
  <div>2</div>
</div>

```html
<div bp-layout="block gap:sm align:block-stretch">
  <div>1</div>
  <div>2</div>
</div>
```

### Stretch - Align

<div bp-layout="block gap:sm align:stretch" style="min-height: 350px" demo>
  <div>1</div>
  <div>2</div>
</div>

```html
<div bp-layout="block gap:sm align:block-stretch">
  <div>1</div>
  <div>2</div>
</div>
```

Stretch Aligns allow items to fill the space within the parent layout container.

### Stretch - Inline

<div bp-layout="block gap:sm align:inline-stretch" demo>
  <div>1</div>
  <div>2</div>
</div>

```html
<div bp-layout="block gap:sm align:inline-stretch">
  <div>1</div>
  <div>2</div>
</div>
```

### Stretch - Block

<div bp-layout="block gap:sm align:block-stretch" style="min-height: 350px" demo>
  <div>1</div>
  <div>2</div>
</div>

```html
<div bp-layout="block gap:sm align:block-stretch">
  <div>1</div>
  <div>2</div>
</div>
```

### Stretch - Align

<div bp-layout="block gap:sm align:stretch" style="min-height: 350px" demo>
  <div>1</div>
  <div>2</div>
</div>

```html
<div bp-layout="block gap:sm align:block-stretch">
  <div>1</div>
  <div>2</div>
</div>
```

<div bp-layout="inline align:center">
  <bp-button action="outline" status="accent" bp-layout="inline:center"><a href="/docs/layout/inline.html">Next: Inline Layout</a></bp-button>
</div>