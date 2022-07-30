export const metadata = {
  name: 'grid'
};

export function example() {
  return /* html */`
  <div bp-layout="grid gap:md" demo>
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
  </div>
  `;
}

export function auto() {
  return /* html */`
  <div bp-layout="grid gap:md cols:auto" demo>
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
  </div>`;
}

export function columns() {
  return /* html */`
  <div bp-layout="grid gap:md cols:6" demo>
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
  </div>`;
}

export function nested() {
  return /* html */`
  <div bp-layout="grid gap:md cols:6" demo>
    <div bp-layout="grid gap:md cols:4">
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </div>

    <div>4</div>
  </div>`;
}

export function responsive() {
  return /* html */`
  <div bp-layout="grid gap:md cols:12 cols:6@sm cols:3@md" demo>
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
  </div>`;
}

export function responsiveContainer() {
  return /* html */`
  <div bp-layout="grid gap:md cols:12 cols:6@sm" style="max-width: 800px; margin-inline: auto" demo>
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
  </div>`;
}

export function responsiveColumns() {
  return /* html */`
  <div bp-layout="grid gap:md" demo>
    <div bp-layout="col:4@sm">1</div>
    <div bp-layout="col:8@sm">2</div>
  </div>`;
}

export function gap() {
  return /* html */`
  <div bp-layout="block gap:lg">
    <div bp-layout="grid gap:xs cols:3" demo>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
    </div>
    <div bp-layout="grid gap:sm cols:3" demo>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
    </div>
    <div bp-layout="grid gap:md cols:3" demo>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
    </div>
    <div bp-layout="grid gap:lg cols:3" demo>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
    </div>
    <div bp-layout="grid gap:xl cols:3" demo>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
    </div>
  </div>
  `;
}

export function columnStartEnd() {
  return /* html */`
  <div bp-layout="grid gap:md" demo>
    <div bp-layout="col:start-3 col:8">1</div>
    <div bp-layout="col:start-1 col:end-5">2</div>
    <div bp-layout="col:4 col:end-13">3</div>
    <div bp-layout="col:start-1 col:end-13">4</div>
  </div>`;
}

export function rowStartEnd() {
  return /* html */`
  <div bp-layout="grid cols:4 gap:md" demo>
    <div bp-layout="row:4 row:start-6">1</div>
    <div bp-layout="row:6 row:start-4">2</div>
    <div bp-layout="row:12">3</div>
  </div>`;
}

export function align() {
  return /* html */`
  <div bp-layout="block gap:lg">
    <div bp-layout="grid gap:md cols:auto inline:start" demo>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
    </div>

    <div bp-layout="grid gap:md cols:auto inline:end" demo>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
    </div>

    <div bp-layout="grid gap:md cols:auto inline:center" demo>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
    </div>

    <div bp-layout="grid gap:md block:start" style="height: 200px" demo>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
    </div>
    
    <div bp-layout="grid gap:md block:end" style="height: 200px" demo>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
    </div>

    <div bp-layout="grid gap:md block:center" style="height: 200px" demo>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
    </div>

    <div bp-layout="grid gap:md cols:auto center" style="height: 200px" demo>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
    </div>
  </div>`;
}

export function stretch() {
  return /* html */`
  <div bp-layout="block gap:lg">
    <div bp-layout="grid gap:md cols:auto inline:stretch" style="height: 200px" demo>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
    </div>

    <div bp-layout="grid gap:md block:stretch" style="height: 200px" demo>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
    </div>

    <div bp-layout="grid gap:md cols:auto stretch" style="height: 200px" demo>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
    </div>
  </div>`;
}