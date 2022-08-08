---
title: Grid - Row Start/End
description: 
keywords:
meta-tags:
---

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
