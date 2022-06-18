export const metadata = {
  name: 'block'
};

export function example() {
  return /* html */`
  <div bp-layout="block gap:md">
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
  </div>
  `;
}

export function gap() {
  return /* html */`
  <div bp-layout="inline gap:lg">
    <div bp-layout="block gap:xs" demo>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
    </div>
    <div bp-layout="block gap:sm" demo>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
    </div>
    <div bp-layout="block gap:md" demo>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
    </div>
    <div bp-layout="block gap:lg" demo>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
    </div>
    <div bp-layout="block gap:xl" demo>
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
    <div bp-layout="block gap:md block:start" style="min-height: 200px; width: 100%" demo>
      <div>1</div>
      <div>2</div>
    </div>

    <div bp-layout="block gap:md block:end" style="min-height: 200px; width: 100%" demo>
      <div>1</div>
      <div>2</div>
    </div>

    <div bp-layout="block gap:md block:center" style="min-height: 200px; width: 100%" demo>
      <div>1</div>
      <div>2</div>
    </div>

    <div bp-layout="block gap:md inline:start" style="width: 100%" demo>
      <div>1</div>
      <div>2</div>
    </div>

    <div bp-layout="block gap:md inline:end" style="width: 100%" demo>
      <div>1</div>
      <div>2</div>
    </div>

    <div bp-layout="block gap:md inline:center" style="width: 100%" demo>
      <div>1</div>
      <div>2</div>
    </div>

    <div bp-layout="block gap:md center" style="min-height: 200px; width: 100%" demo>
      <div>1</div>
      <div>2</div>
    </div>
  </div>
  `;
}

export function itemAlignment() {
  return /* html */`
  <div bp-layout="block gap:lg">
    <div bp-layout="block gap:md block:end" style="min-height: 350px; width: 100%" demo>
      <div bp-layout="block:start">1</div>
      <div>2</div>
      <div>3</div>
    </div>
    <div bp-layout="block gap:md" style="min-height: 350px; width: 100%" demo>
      <div>1</div>
      <div>2</div>
      <div bp-layout="block:end">3</div>
    </div>
    <div bp-layout="block gap:md" style="min-height: 200px; width: 100%" demo>
      <div bp-layout="block:center">1</div>
    </div>
    <div bp-layout="block gap:md" style="min-height: 200px; width: 100%" demo>
      <div bp-layout="inline:start">1</div>
      <div bp-layout="inline:center">2</div>
      <div bp-layout="inline:end">3</div>
    </div>
    <div bp-layout="block gap:md" style="min-height: 200px; width: 100%" demo>
      <div bp-layout="center">1</div>
    </div>
  </div>
  <script type="module">
    document.body.addEventListener('click', e => console.log('hello there'));
  </script>
  `;
}

export function stretch() {
  return /* html */`
  <div bp-layout="block gap:lg">
    <div bp-layout="block gap:md align:inline-stretch" style="min-height: 200px; width: 100%" demo>
      <div>1</div>
      <div>2</div>
    </div>
    <div bp-layout="block gap:md align:block-stretch" style="min-height: 300px; width: 100%" demo>
      <div>1</div>
      <div>2</div>
    </div>
    <div bp-layout="block gap:md align:stretch" style="min-height: 300px; width: 100%" demo>
      <div>1</div>
      <div>2</div>
    </div>
  </div>
  `;
}
