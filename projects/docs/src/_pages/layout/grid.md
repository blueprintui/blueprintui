---
title: Grid
description: 
keywords:
meta-tags:
---

Blueprint Grid defaults to a 12 column CSS Grid layout for flexibility accross many layout cobinations. Implicit uniform columns can define their values at the parent grid element without the need for element wrappers.

<div bp-layout="grid gap:sm cols:6" demo>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>

```html
<div bp-layout="grid gap:sm cols:6">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>
```

## Columns

### Explicit Columns

Columns that are not uniform can define their column span value directly on the column element. Column properties can be placed directly on the element with no need for wrapper elements.

<div bp-layout="grid gap:sm" demo>
  <div bp-layout="col:4">4</div>
  <div bp-layout="col:8">8</div>
</div>

```html
<div bp-layout="grid gap:sm">
  <div bp-layout="col:4">4</div>
  <div bp-layout="col:8">8</div>
</div>
```


### Auto Columns

Auto layout columns will fill the available space evenly accross all child elements without needing to define specific column values.

<div bp-layout="grid gap:sm cols:auto" demo>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>

```html
<div bp-layout="grid gap:sm cols:auto">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>
```


### Nested Columns

Grid Columns can be nested. Nested columns themselves can also be host grids containing additional columns.

<div bp-layout="grid gap:sm cols:6" demo>
  <div bp-layout="grid gap:sm cols:4" demo>
    <div>1</div>
    <div>2</div>
    <div>3</div>
  </div>

  <div>4</div>
</div>

```html
<div bp-layout="grid gap:sm cols:6">
  <div bp-layout="grid gap:sm cols:4">
    <div>1</div>
    <div>2</div>
    <div>3</div>
  </div>

  <div>4</div>
</div>
```

## Responsive

### Implicit Columns

Columns can be set to container query breakpoints. 

<div bp-layout="grid gap:sm cols:12 cols:6@sm cols:3@md" demo resizable>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>

```html
<div bp-layout="grid gap:sm cols:12 cols:6@sm cols:3@md">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>
```

### Explicit Columns

<div bp-layout="grid gap:sm" demo resizable>
  <div bp-layout="col:4@sm">4</div>
  <div bp-layout="col:8@sm">8</div>
</div>

```html
<div bp-layout="grid gap:sm">
  <div bp-layout="col:4@sm">4</div>
  <div bp-layout="col:8@sm">8</div>
</div>
```

## Gap

Gaps allow control of white space between layout items. Gaps can be set via t-shirt sizes, `xs`, `sm`, `md`, `lg`, `xl`.

### Extra Small

<div bp-layout="grid gap:xs cols:3" demo>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>

```html
<div bp-layout="grid gap:xs cols:3">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>
```

### Small

<div bp-layout="grid gap:sm cols:3" demo>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>

```html
<div bp-layout="grid gap:sm cols:3">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>
```

### Medium

<div bp-layout="grid gap:sm cols:3" demo>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>

```html
<div bp-layout="grid gap:sm cols:3">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>
```

### Large

<div bp-layout="grid gap:lg cols:3" demo>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>

```html
<div bp-layout="grid gap:lg cols:3">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>
```

### Extra Large

<div bp-layout="grid gap:xl cols:3" demo>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>

```html
<div bp-layout="grid gap:xl cols:3">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>
```

## Alignment

<bp-alert status="warning">
  Inline alignments columns must use auto placement as inline alignment negates column positioning.
</bp-alert>

Alignments enable control of the column alignment within the grid container. Block alignments run along the vertical axis and inline alignments run ont the horizontal axis.

### Center

<div bp-layout="grid cols:auto gap:sm center" style="height: 200px" demo>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>

```html
<div bp-layout="grid cols:auto gap:sm center">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>
```

### Inline Start

<div bp-layout="grid gap:sm cols:auto inline:start" demo>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>

```html
<div bp-layout="grid gap:sm cols:auto inline:start">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>
```

### Inline End

<div bp-layout="grid gap:sm cols:auto inline:end" demo>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>

```html
<div bp-layout="grid gap:sm cols:auto inline:end">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>
```

### Inline Center

<div bp-layout="grid gap:sm cols:auto inline:center" demo>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>

```html
<div bp-layout="grid gap:sm cols:auto inline:center">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>
```

### Block Start

<div bp-layout="grid gap:sm block:start" style="height: 200px" demo>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>

```html
<div bp-layout="grid gap:sm block:start">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>
```

### Block End

<div bp-layout="grid gap:sm block:end" style="height: 200px" demo>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>

```html
<div bp-layout="grid gap:sm block:end">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>
```

### Block Center

<div bp-layout="grid gap:sm block:center" style="height: 200px" demo>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>

```html
<div bp-layout="grid gap:sm block:center">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>
```

## Stretch

Stretch alignments allow items to fill the space within the parent layout container.

<bp-alert status="warning">
  Inline stretch for columns must use auto placement as inline stretch negates column positioning.
</bp-alert>

### Inline Stretch

<div bp-layout="grid gap:sm cols:auto inline:stretch" style="height: 200px" demo>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>

```html
<div bp-layout="grid gap:sm cols:auto inline:stretch">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>
```

### Block Stretch

<div bp-layout="grid gap:sm block:stretch" style="height: 200px" demo>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>

```html
<div bp-layout="grid gap:sm block:stretch">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>
```

### Stretch All

<div bp-layout="grid gap:sm cols:auto stretch" style="height: 200px" demo>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>

```html
<div bp-layout="grid gap:sm cols:auto stretch">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>
```

## Column Start & End

Column start and end positioning can be controlled across the 12 column grid.

### Start


<div bp-layout="grid gap:sm" demo>
  <div bp-layout="col:start-2 ">1</div>
  <div bp-layout="col:start-1">2</div>
</div>

```html
<div bp-layout="grid gap:sm">
  <div bp-layout="col:start-3 col:8">1</div>
  <div bp-layout="col:start-1 col:end-5">2</div>
  <div bp-layout="col:4 col:end-13">3</div>
  <div bp-layout="col:start-1 col:end-13">4</div>
</div>
```

### End

<div bp-layout="grid gap:sm" demo>
  <div bp-layout="col:start-3 col:8">1</div>
  <div bp-layout="col:start-1 col:end-5">2</div>
</div>

```html
<div bp-layout="grid gap:sm" demo>
  <div bp-layout="col:start-3 col:8">1</div>
  <div bp-layout="col:start-1 col:end-5">2</div>
</div>
```

### Start & End

<div bp-layout="grid gap:sm" demo>
  <div bp-layout="col:start-3 col:8">1</div>
  <div bp-layout="col:start-1 col:end-5">2</div>
  <div bp-layout="col:4 col:end-13">3</div>
  <div bp-layout="col:start-1 col:end-13">4</div>
</div>

```html
<div bp-layout="grid gap:sm">
  <div bp-layout="col:start-3 col:8">1</div>
  <div bp-layout="col:start-1 col:end-5">2</div>
  <div bp-layout="col:4 col:end-13">3</div>
  <div bp-layout="col:start-1 col:end-13">4</div>
</div>
```

## Row Start & End

Row start and end positioning can be controlled across the 12 row grid.

<div bp-layout="grid cols:4 gap:sm" demo>
  <div bp-layout="row:4 row:start-6">1</div>
  <div bp-layout="row:6 row:start-4">2</div>
  <div bp-layout="row:12">3</div>
</div>

```html
<div bp-layout="grid cols:4 gap:sm">
  <div bp-layout="row:4 row:start-6">1</div>
  <div bp-layout="row:6 row:start-4">2</div>
  <div bp-layout="row:12">3</div>
</div>
```
