export const metadata = {
  name: 'format-token',
  elements: ['bp-format-token']
};

export function example() {
  return /* html */ `
    <script type="module">
      import '@blueprintui/components/include/format-token.js';
    </script>

    <bp-format-token>Hello world! This is a test of token segmentation.</bp-format-token>
  `;
}

export function formats() {
  return /* html */ `
    <script type="module">
      import '@blueprintui/components/include/format-token.js';
    </script>

    <div bp-layout="block gap:md">
      <div>
        <h4>BPE (GPT-style)</h4>
        <bp-format-token format="bpe">Hello world! This is a test.</bp-format-token>
      </div>

      <div>
        <h4>WordPiece (BERT-style)</h4>
        <bp-format-token format="word-piece">Hello world! This is a test.</bp-format-token>
      </div>

      <div>
        <h4>SentencePiece</h4>
        <bp-format-token format="sentence-piece">Hello world! This is a test.</bp-format-token>
      </div>

      <div>
        <h4>LLaMA</h4>
        <bp-format-token format="llama">Hello world! This is a test.</bp-format-token>
      </div>

      <div>
        <h4>Character-level</h4>
        <bp-format-token format="character">Hello world!</bp-format-token>
      </div>

      <div>
        <h4>Whitespace</h4>
        <bp-format-token format="whitespace">Hello world! This is a test.</bp-format-token>
      </div>
    </div>
  `;
}

export function technicalText() {
  return /* html */ `
    <script type="module">
      import '@blueprintui/components/include/format-token.js';
    </script>

    <bp-format-token format="word-piece">
      function calculateTotal(items) { return items.reduce((sum, item) => sum + item.price, 0); }
    </bp-format-token>
  `;
}

export function multilingualText() {
  return /* html */ `
    <script type="module">
      import '@blueprintui/components/include/format-token.js';
    </script>

    <div bp-layout="block gap:md">
      <div>
        <h4>English</h4>
        <bp-format-token format="sentence-piece">Hello, how are you?</bp-format-token>
      </div>

      <div>
        <h4>Numbers and Symbols</h4>
        <bp-format-token format="llama">Price: $1,234.56 (25% off)</bp-format-token>
      </div>

      <div>
        <h4>Mixed Content</h4>
        <bp-format-token format="bpe">Visit https://example.com for more info!</bp-format-token>
      </div>
    </div>
  `;
}
