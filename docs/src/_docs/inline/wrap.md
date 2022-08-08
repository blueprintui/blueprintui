---
title: Inline - Wrap
description: 
keywords:
meta-tags:
---

By default inline layouts allow items to wrap within the parent layout container.


## Wrap

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
## No Wrap

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