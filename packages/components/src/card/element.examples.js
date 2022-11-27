export const metadata = {
  name: 'card',
  elements: ['bp-card', 'bp-card-header', 'bp-card-footer']
};

export function example() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/card.js';
      import '@blueprintui/components/include/button.js';
    </script>
    <bp-card>
      <h2 bp-text="subsection">Heading</h2>
      <p bp-text="content">Content</p>
    </bp-card>
  `;
}

export function cardGrid() {
  return /* html */`
    <div bp-layout="grid  gap:sm cols:12 cols:6@sm">
      <bp-card>
        <h2 bp-text="subsection">Heading</h2>
        <p bp-text="content">Content</p>
      </bp-card>
      <bp-card>
        <h2 bp-text="subsection">Heading</h2>
        <p bp-text="content">Content</p>
      </bp-card>
      <bp-card>
        <h2 bp-text="subsection">Heading</h2>
        <p bp-text="content">Content</p>
      </bp-card>
      <bp-card>
        <h2 bp-text="subsection">Heading</h2>
        <p bp-text="content">Content</p>
      </bp-card>
    </div>
  `;
}

export function cardMedia() {
  return /* html */`
    <div bp-layout="grid cols:6@md gap:md">
      <bp-card>
          <bp-card-header>
            <img src="http://via.placeholder.com/640x360" />
          </bp-card-header>
          <p bp-text="content">Content</p>
          <bp-card-footer>
          <div bp-layout="inline gap:sm inline:end">
            <bp-button action="outline">Read</bp-button>
          </div>
        </bp-card-footer>
      </bp-card>
      <bp-card>
        <bp-card-header>
          <img src="http://via.placeholder.com/640x360" />
        </bp-card-header>
        <p bp-text="content">Content</p>
        <bp-card-footer>
          <div bp-layout="inline gap:sm inline:end">
            <bp-button action="outline">Read</bp-button>
          </div>
        </bp-card-footer>
      </bp-card>
    </div>
  `;
}

export function cardContent() {
  return /* html */`
<div bp-layout="grid gap:sm cols:12 cols:6@sm">
  <bp-card>
    <bp-card-header>
      <h2 bp-text="section">Heading</h2>
    </bp-card-header>
    <p bp-text="content">Content</p>
    <bp-card-footer>
      <div bp-layout="inline gap:xs inline:end">
        <bp-button action="outline">Cancel</bp-button>
        <bp-button status="accent">Confirm</bp-button>
      </div>
    </bp-card-footer>
  </bp-card>
  <bp-card>
    <bp-card-header>
      <h2 bp-text="section">Heading</h2>
    </bp-card-header>
    <p bp-text="content">Content</p>
    <bp-card-footer>
      <div bp-layout="inline gap:xs inline:end">
        <bp-button action="outline">Cancel</bp-button>
        <bp-button status="accent">Confirm</bp-button>
      </div>
    </bp-card-footer>
  </bp-card>
</div>
  `;
}