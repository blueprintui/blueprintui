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


## Explicit Columns

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


## Auto Columns

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


## Nested Columns

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