---
title: Grid - Alignment
description: 
keywords:
meta-tags:
---

<bp-alert status="warning">
  Inline alignments columns must use auto placement as inline alignment negates column positioning.
</bp-alert>

Alignments enable control of the column alignment within the grid container. Block alginments run along the vertical axis and inline alignments run ont the horizontal axis.

## Center

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

## Inline Start

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

## Inline End

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

## Inline Center

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

## Block Start

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

## Block End

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

## Block Center

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
