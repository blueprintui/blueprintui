---
title: Inline
description: 
keywords:
meta-tags:
---

Inline layouts define a collection of elements in a horizontal list. Alignemnt of items can be controlled as a group or independently for each item.

<div bp-layout="inline gap:sm" demo>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>

```html
<div bp-layout="inline gap:sm">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>
```

## Gap

Gaps allow control of white space between layout items. Gaps can be set via t-shirt sizes, `xs`, `sm`, `md`, `lg`, `xl`.

### Extra Small

<div bp-layout="inline gap:xs" demo>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>

```html
<div bp-layout="inline gap:xs">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>
```

### Small

<div bp-layout="inline gap:sm" demo>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>

```html
<div bp-layout="inline gap:sm">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>
```

### Medium

<div bp-layout="inline gap:md" demo>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>

```html
<div bp-layout="inline gap:md">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>
```

### Large

<div bp-layout="inline gap:lg" demo>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>

```html
<div bp-layout="inline gap:lg">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>
```

### Extra Large

<div bp-layout="inline gap:xl" demo>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>

```html
<div bp-layout="inline gap:xl">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>
```

## Alignment

Alignments enable control of the item alignment within the layout container. Block alignments run along the vertical axis and inline alignments run ont the horizontal axis.

### Center

<div bp-layout="inline gap:sm center" style="min-height: 200px" demo>
  <div>1</div>
  <div>2</div>
</div>

```html
<div bp-layout="inline gap:sm center">
  <div>1</div>
  <div>2</div>
</div>
```

### Inline Start

<div bp-layout="inline gap:sm inline:start" demo>
  <div>1</div>
  <div>2</div>
</div>

```html
<div bp-layout="inline gap:sm inline:start">
  <div>1</div>
  <div>2</div>
</div>
```

### Inline End

<div bp-layout="inline gap:sm inline:end" demo>
  <div>1</div>
  <div>2</div>
</div>

```html
<div bp-layout="inline gap:sm inline:end">
  <div>1</div>
  <div>2</div>
</div>
```

### Inline Center

<div bp-layout="inline gap:sm inline:center" demo>
  <div>1</div>
  <div>2</div>
</div>

```html
<div bp-layout="inline gap:sm inline:center">
  <div>1</div>
  <div>2</div>
</div>
```

### Block Start

<div bp-layout="inline gap:sm block:start" style="height: 200px" demo>
  <div>1</div>
  <div>2</div>
</div>

```html
<div bp-layout="inline gap:sm block:start">
  <div>1</div>
  <div>2</div>
</div>
```

### Block Center

<div bp-layout="inline gap:sm block:center" style="height: 200px" demo>
  <div>1</div>
  <div>2</div>
</div>

```html
<div bp-layout="inline gap:sm block:center">
  <div>1</div>
  <div>2</div>
</div>
```

### Block End

<div bp-layout="inline gap:sm block:end" style="height: 200px" demo>
  <div>1</div>
  <div>2</div>
</div>

```html
<div bp-layout="inline gap:sm block:end">
  <div>1</div>
  <div>2</div>
</div>
```


## Item Alignment

Item alignment similar to alignments allow individual items to align separately from the rest of the items within the layout group.

### Center

<div bp-layout="inline gap:sm" style="height: 200px" demo>
  <div bp-layout="center">1</div>
</div>

```html
<div bp-layout="inline gap:sm">
  <div bp-layout="center">1</div>
</div>
```

### Inline Start

<div bp-layout="inline gap:sm" demo>
  <div bp-layout="inline:start">1</div>
</div>

```html
<div bp-layout="inline gap:sm">
  <div bp-layout="inline:start">1</div>
</div>
```

### Inline End

<div bp-layout="inline gap:sm" demo>
  <div bp-layout="inline:end">1</div>
</div>

```html
<div bp-layout="inline gap:sm">
  <div bp-layout="inline:end">1</div>
</div>
```

### Inline Center

<div bp-layout="inline gap:sm" demo>
  <div bp-layout="inline:center">1</div>
</div>

```html
<div bp-layout="inline gap:sm">
  <div bp-layout="inline:center">1</div>
</div>
```

### Block Start

<div bp-layout="inline gap:sm" style="height: 250px" demo>
  <div bp-layout="block:start">1</div>
</div>

```html
<div bp-layout="inline gap:sm">
  <div bp-layout="block:start">1</div>
</div>
```

### Block End

<div bp-layout="inline gap:sm" style="height: 250px" demo>
  <div bp-layout="block:end">1</div>
</div>

```html
<div bp-layout="inline gap:sm">
  <div bp-layout="block:end">1</div>
</div>
```

### Block Center

<div bp-layout="inline gap:sm" style="height: 250px" demo>
  <div bp-layout="block:center">1</div>
</div>

```html
<div bp-layout="inline gap:sm">
  <div bp-layout="block:center">1</div>
</div>
```

## Stretch

<div bp-layout="block gap:lg">
  <div bp-layout="inline gap:sm inline:stretch" style="height: 150px" demo>
    <div>1</div>
    <div>2</div>
  </div>
  <div bp-layout="inline gap:sm block:stretch" style="height: 150px" demo>
    <div>1</div>
    <div>2</div>
  </div>
  <div bp-layout="inline gap:sm stretch" style="height: 150px" demo>
    <div>1</div>
    <div>2</div>
  </div>
</div>

```html
<div bp-layout="block gap:lg">
  <div bp-layout="inline gap:sm inline:stretch" style="height: 150px">
    <div>1</div>
    <div>2</div>
  </div>
  <div bp-layout="inline gap:sm block:stretch" style="height: 150px">
    <div>1</div>
    <div>2</div>
  </div>
  <div bp-layout="inline gap:sm stretch" style="height: 150px">
    <div>1</div>
    <div>2</div>
  </div>
</div>
```

## Wrap

By default inline layouts allow items to wrap within the parent layout container.

<div bp-layout="inline gap:sm" style="max-width: 200px" demo>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
  <div>6</div>
</div>

```html
<div bp-layout="inline gap:sm">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
  <div>6</div>
</div>
```

### No Wrap

<div bp-layout="inline gap:sm wrap:none" style="max-width: 200px;" demo>
  <div style="outline: 1px solid #ccc">1</div>
  <div style="outline: 1px solid #ccc">2</div>
  <div style="outline: 1px solid #ccc">3</div>
  <div style="outline: 1px solid #ccc">4</div>
  <div style="outline: 1px solid #ccc">5</div>
  <div style="outline: 1px solid #ccc">6</div>
</div>

```html
<div bp-layout="inline gap:sm wrap:none">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
  <div>6</div>
</div>
```

<div bp-layout="inline align:center">
  <bp-button action="outline" status="accent" bp-layout="inline:center"><a href="/docs/layout/grid">Next: Grid Layout</a></bp-button>
</div>
