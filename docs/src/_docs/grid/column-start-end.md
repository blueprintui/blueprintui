---
title: Grid - Column Start/End
description: 
keywords:
meta-tags:
---

Column start and end positioning can be controlled across the 12 column grid.

## Column Start


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

## Column End

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

## Column Start and End

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
