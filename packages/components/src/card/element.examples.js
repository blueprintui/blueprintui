export const metadata = {
  name: 'card',
  elements: ['bp-card']
};

export function example() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/card.js';
      import '@blueprintui/components/include/button.js';
    </script>
    <bp-card>
      <h2 slot="header" bp-text="subsection">Heading</h2>
      <p bp-text="content">Content</p>
    </bp-card>
  `;
}

export function cardGrid() {
  return /* html */`
    <div bp-layout="grid  gap:sm cols:12 cols:6@sm">
      <bp-card>
        <h2 slot="header" bp-text="subsection">Heading</h2>
        <p bp-text="content">Content</p>
      </bp-card>
      <bp-card>
        <h2 slot="header" bp-text="subsection">Heading</h2>
        <p bp-text="content">Content</p>
      </bp-card>
      <bp-card>
        <h2 slot="header" bp-text="subsection">Heading</h2>
        <p bp-text="content">Content</p>
      </bp-card>
      <bp-card>
        <h2 slot="header" bp-text="subsection">Heading</h2>
        <p bp-text="content">Content</p>
      </bp-card>
    </div>
  `;
}

export function cardMedia() {
  return /* html */`
    <div bp-layout="grid cols:12 cols:6@sm gap:md">
      <bp-card>
        <img slot="header" src="http://via.placeholder.com/640x360" />
        <p bp-text="content">Content</p>
        <div slot="footer" bp-layout="inline gap:sm inline:end">
          <bp-button action="outline">Read</bp-button>
        </div>
      </bp-card>
      <bp-card>
        <img slot="header" src="http://via.placeholder.com/640x360" />
        <p bp-text="content">Content</p>
        <div slot="footer" bp-layout="inline gap:sm inline:end">
          <bp-button action="outline">Read</bp-button>
        </div>
      </bp-card>
    </div>
  `;
}

export function cardContent() {
  return /* html */`
<div bp-layout="grid gap:sm cols:12 cols:6@sm">
  <bp-card>
    <h2 slot="header" bp-text="section">Heading</h2>
    <bp-field>
      <label>label</label>
      <bp-input></bp-input>
    </bp-field>
    <div slot="footer" bp-layout="inline gap:xs inline:end">
      <bp-button action="outline">Cancel</bp-button>
      <bp-button status="accent">Confirm</bp-button>
    </div>
  </bp-card>
  <bp-card>
    <h2 slot="header" bp-text="section">Heading</h2>
    <bp-field>
      <label>label</label>
      <bp-input></bp-input>
    </bp-field>
    <div slot="footer" bp-layout="inline gap:xs inline:end">
      <bp-button action="outline">Cancel</bp-button>
      <bp-button status="accent">Confirm</bp-button>
    </div>
  </bp-card>
</div>
  `;
}