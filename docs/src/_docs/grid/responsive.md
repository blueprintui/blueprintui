---
title: Grid - Responsive
description: 
keywords:
meta-tags:
---


## Responsive Implicit Columns

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

## Responsive Explicit Columns

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
