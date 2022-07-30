export const metadata = {
  name: 'inline'
};

export function example() {
  return /* html */`
  <div bp-layout="inline gap:md" demo>
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
  </div>
  `;
}

export function wrap() {
  return /* html */`
    <div bp-layout="inline gap:md wrap:none" style="max-width: 200px" demo>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
    </div>

    <hr />

    <div bp-layout="inline gap:md" style="max-width: 200px" demo>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
    </div>
  `;
}

export function gap() {
  return /* html */`
  <div bp-layout="block gap:lg">
    <div bp-layout="inline gap:xs" demo>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
    </div>
    <div bp-layout="inline gap:sm" demo>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
    </div>
    <div bp-layout="inline gap:md" demo>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
    </div>
    <div bp-layout="inline gap:lg" demo>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
    </div>
    <div bp-layout="inline gap:xl" demo>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
    </div>
  </div>
  `;
}

export function alignment() {
  return /* html */`
  <div bp-layout="block gap:lg">
    <div bp-layout="inline gap:md inline:start" demo>
      <div>1</div>
      <div>2</div>
    </div>

    <div bp-layout="inline gap:md inline:end" demo>
      <div>1</div>
      <div>2</div>
    </div>

    <div bp-layout="inline gap:md inline:center" demo>
      <div>1</div>
      <div>2</div>
    </div>

    <div bp-layout="inline gap:md center" style="height: 150px" demo>
      <div>1</div>
      <div>2</div>
    </div>

    <div bp-layout="inline gap:md block:start" style="height: 150px" demo>
      <div>1</div>
      <div>2</div>
    </div>

    <div bp-layout="inline gap:md block:center" style="height: 150px" demo>
      <div>1</div>
      <div>2</div>
    </div>

    <div bp-layout="inline gap:md block:end" style="height: 150px" demo>
      <div>1</div>
      <div>2</div>
    </div>
  </div>
  `;
}

export function itemAlignment() {
  return /* html */`
  <div bp-layout="block gap:lg">
    <div bp-layout="inline gap:md" demo>
      <div bp-layout="inline:start">1</div>
    </div>
    <div bp-layout="inline gap:md" demo>
      <div bp-layout="inline:end">2</div>
    </div>
    <div bp-layout="inline gap:md" demo>
      <div bp-layout="inline:center">1</div>
    </div>
    <div bp-layout="inline gap:md" style="height: 150px" demo>
      <div bp-layout="center">1</div>
    </div>
    <div bp-layout="inline gap:md" style="height: 150px" demo>
      <div bp-layout="block:start">1</div>
      <div bp-layout="block:center">2</div>
      <div bp-layout="block:end">3</div>
    </div>
  </div>
  `;
}

export function stretch() {
  return /* html */`
  <div bp-layout="block gap:lg">
    <div bp-layout="inline gap:md inline:stretch" style="height: 150px" demo>
      <div>1</div>
      <div>2</div>
    </div>
    <div bp-layout="inline gap:md block:stretch" style="height: 150px" demo>
      <div>1</div>
      <div>2</div>
    </div>
    <div bp-layout="inline gap:md stretch" style="height: 150px" demo>
      <div>1</div>
      <div>2</div>
    </div>
  </div>
  `;
}
