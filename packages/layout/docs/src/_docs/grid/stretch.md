---
title: Grid - Stretch
description: 
keywords:
meta-tags:
---

Stretch alignments allow items to fill the space within the parent layout container.

<bp-alert status="warning">
  Inline stretch for columns must use auto placement as inline stretch negates column positioning.
</bp-alert>

## Inline Stretch

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

## Block Stretch

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

## Stretch

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
