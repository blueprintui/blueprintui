---
title: Block - Item Alignment
description: 
keywords:
meta-tags:
---

Item alignment similar to alignments allow individual items to align separately from the rest of the items within the layout group.

## Center

<div bp-layout="block gap:sm" style="min-height: 200px" demo>
  <div bp-layout="center">1</div>
</div>

```html
<div bp-layout="block gap:sm">
  <div bp-layout="center">1</div>
</div>
```

## Block Start

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

## Block End

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

## Block Center

<div bp-layout="block gap:sm" style="min-height: 250px" demo>
  <div bp-layout="block:center">1</div>
</div>

```html
<div bp-layout="block gap:sm" style="min-height: 250px">
  <div bp-layout="block:center">1</div>
</div>
```

## Inline Start

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

## Inline Center

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

## Inline End

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
