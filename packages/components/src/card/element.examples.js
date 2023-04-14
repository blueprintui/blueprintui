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
        <img slot="header" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoAAAAFoCAIAAABIUN0GAAAVeklEQVR4nO3dWVMb6dmAYbSBQIDA2MaAMWPPZGaSqlTl//8Gn+QkNWPjhd0sNggDAiSk70AVfV0NliVB+1GS6zoaFAn10J2+p5f37dzr16/HAIAfKx+9AADwv0iAASCAAANAAAEGgAACDAABBBgAAggwAAQQYAAIIMAAEECAASCAAANAAAEGgAACDAABBBgAAggwAAQQYAAIIMAAEECAASCAAANAAAEGgAACDAABBBgAAggwAAQQYAAIIMAAEECAASCAAANAAAEGgAACDAABBBgAAggwAAQQYAAIIMAAEECAASCAAANAAAEGgAACDAABBBgAAggwAAQQYAAIIMAAEECAASCAAANAAAEGgAACDAABBBgAAggwAAQQYAAIIMAAEECAASCAAANAAAEGgAACDAABBBgAAggwAAQQYAAIIMAAEECAASCAAANAAAEGgAACDAABBBgAAggwAAQQYAAIIMAAEECAASCAAANAAAEGgAACDAABBBgAAggwAAQQYAAIIMAAEECAASCAAANAAAEGgAACDAABBBgAAggwAAQQYAAIIMAAEECAASCAAANAAAEGgAACDAABBBgAAggwAAQQYAAIIMAAEECAASCAAANAAAEGgAACDAABBBgAAggwAAQQYAAIIMAAEECAASCAAANAAAEGgAACDAABBBgAAggwAAQQYAAIIMAAEECAASCAAANAAAEGgAACDAABBBgAAggwAAQQYAAIIMAAEECAASCAAANAAAEGgAACDAABBBgAAggwAAQQYAAIIMAAEECAASCAAANAAAEGgAACDAABBBgAAggwAAQQYAAIIMAAEECAASCAAANAAAEGgAACDAABBBgAAggwAAQQYAAIIMAAEECAASCAAANAAAEGgAACDAABBBgAAggwAAQQYAAIIMAAEECAASCAAANAAAEGgAACDAABBBgAAggwAAQQYAAIIMAAEECAASCAAANAAAEGgAACDAABBBgAAggwAAQQYAAIIMAAEECAASCAAANAAAEGgAACDAABitELwP+i8/PzWq12fn5+fX19c3PTbreLxWKpVKpUKrOzszMzMw/+jR8+fKjVap1/XlhYWF1dHfQ3XF1dHR8fn5+fX15edpa5UCiMj49XKpVqtTo9Pf3QizyiWq3WycnJ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JlUqlSEmWH7y5MlD7bvr9XrqgYNzc3N31nfsrhPRt2+cHk65XH716tUQ47CLxeKrV696D6XNdNsIX4PQmwDzI8zPz//888/9T+zXucs3dRnvx3v06NHa2lr/eVhcXFxZWXmQr+48bzF59FYqlXrnpHMiOvlKrVbrcwROb5VKpfeB7G2Tk5O//vprP7OCZLptBK5B+C6noPlxbm5u9vf3b1/MS5mbm1taWuo9aGQgw52C7urcBtV7Gopyufz8+fMHfCjTzs7O4eFh8pVXr1718/D51InoQqHw22+/PchMJp2BOkdHR6l7rFI6F30fPXo00HFtpttGyBqE7xJgfrSbm5tarfb169d6vd5oNFqtVi6XKxaL5XJ5enp6bm7uwee9umeAOzq3An39+rXRaDQajXa7XSgUxsfHK5VKtVp92B332dnZ+vp68pX+l7ler7958yZ56Dw9Pf3LL7881LK1Wq3T09OvX79eXFw0m81ms9lZfaVSaXp6emZmplKpDP1MiEy3jR+5BqEfAgwAAVwDBoAAAgwAAQQYAAIIMAAEEGAACCDAABBAgAEggAADQAABBoAAAgwAAQQYAAIIMAAEEGAACCDAABBAgAEggAADQAABBoAAAgwAAQQYAAIIMAAEEGAACCDAABBAgAEggAADQAABBoAAAgwAAQQYAAIIMAAEEGAACCDAABBAgAEggAADQAABBoAAAgwAAQQYAAIIMAAEEGAACCDAABBAgAEggAADQAABBoAAAgwAAQQYAAIIMAAEEGAACCDAABBAgAEggAADQAABBoAAAgwAAQQYAAIIMAAEEGAACCDAABBAgAEggAADQAABBoAAAgwAAQQYAAIIMAAEEGAACCDAABBAgAEggAADQAABBoAAAgwAAQQYAAIIMAAEEGAACCDAABBAgAEggAADQAABBoAAAgwAAQQYAAIIMAAEEGAACCDAABBAgAEggAADQAABBoAAAgwAAQQYAAIIMAAEEGAACCDAABBAgAEggAADQAABBoAAAgwAAQQYAAIIMAAEEGAACCDAABBAgAEggAADQAABBoAAAgwAAQQYAAIIMAAEEGAACCDAABBAgAEggAADQAABBoAAAgwAAQQYAAIIMAAEEGAACCDAABBAgAEggAADQAABBoAAAgwAAQQYAAIIMAAEEGAACCDAABBAgAEggAADQAABBoAAAgwAAQQYAAIIMAAEEGAACCDAABBAgAEggAADQAABBoAAAgwAAQQYAAIIMAAEEGAACCDAABBAgAEggAADQAABBoAAAgwAAQQYAAIIMAAEEGAACCDAABBAgAEggAADQAABBoAAAgwAAQQYAAIIMAAEEGAACCDAABBAgAEggAADQAABBoAAAgwAAf4PPGCfSHTldqgAAAAASUVORK5CYII=" />
        <p bp-text="content">Content</p>
        <div slot="footer" bp-layout="inline gap:sm inline:end">
          <bp-button action="outline">Read</bp-button>
        </div>
      </bp-card>
      <bp-card>
        <img slot="header" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoAAAAFoCAIAAABIUN0GAAAVeklEQVR4nO3dWVMb6dmAYbSBQIDA2MaAMWPPZGaSqlTl//8Gn+QkNWPjhd0sNggDAiSk70AVfV0NliVB+1GS6zoaFAn10J2+p5f37dzr16/HAIAfKx+9AADwv0iAASCAAANAAAEGgAACDAABBBgAAggwAAQQYAAIIMAAEECAASCAAANAAAEGgAACDAABBBgAAggwAAQQYAAIIMAAEECAASCAAANAAAEGgAACDAABBBgAAggwAAQQYAAIIMAAEECAASCAAANAAAEGgAACDAABBBgAAggwAAQQYAAIIMAAEECAASCAAANAAAEGgAACDAABBBgAAggwAAQQYAAIIMAAEECAASCAAANAAAEGgAACDAABBBgAAggwAAQQYAAIIMAAEECAASCAAANAAAEGgAACDAABBBgAAggwAAQQYAAIIMAAEECAASCAAANAAAEGgAACDAABBBgAAggwAAQQYAAIIMAAEECAASCAAANAAAEGgAACDAABBBgAAggwAAQQYAAIIMAAEECAASCAAANAAAEGgAACDAABBBgAAggwAAQQYAAIIMAAEECAASCAAANAAAEGgAACDAABBBgAAggwAAQQYAAIIMAAEECAASCAAANAAAEGgAACDAABBBgAAggwAAQQYAAIIMAAEECAASCAAANAAAEGgAACDAABBBgAAggwAAQQYAAIIMAAEECAASCAAANAAAEGgAACDAABBBgAAggwAAQQYAAIIMAAEECAASCAAANAAAEGgAACDAABBBgAAggwAAQQYAAIIMAAEECAASCAAANAAAEGgAACDAABBBgAAggwAAQQYAAIIMAAEECAASCAAANAAAEGgAACDAABBBgAAggwAAQQYAAIIMAAEECAASCAAANAAAEGgAACDAABBBgAAggwAAQQYAAIIMAAEECAASCAAANAAAEGgAACDAABBBgAAggwAAQQYAAIIMAAEECAASCAAANAAAEGgAACDAABBBgAAggwAAQQYAAIIMAAEECAASCAAANAAAEGgAACDAABitELwP+i8/PzWq12fn5+fX19c3PTbreLxWKpVKpUKrOzszMzMw/+jR8+fKjVap1/XlhYWF1dHfQ3XF1dHR8fn5+fX15edpa5UCiMj49XKpVqtTo9Pf3QizyiWq3WycnJ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JlUqlSEmWH7y5MlD7bvr9XrqgYNzc3N31nfsrhPRt2+cHk65XH716tUQ47CLxeKrV696D6XNdNsIX4PQmwDzI8zPz//888/9T+zXucs3dRnvx3v06NHa2lr/eVhcXFxZWXmQr+48bzF59FYqlXrnpHMiOvlKrVbrcwROb5VKpfeB7G2Tk5O//vprP7OCZLptBK5B+C6noPlxbm5u9vf3b1/MS5mbm1taWuo9aGQgw52C7urcBtV7Gopyufz8+fMHfCjTzs7O4eFh8pVXr1718/D51InoQqHw22+/PchMJp2BOkdHR6l7rFI6F30fPXo00HFtpttGyBqE7xJgfrSbm5tarfb169d6vd5oNFqtVi6XKxaL5XJ5enp6bm7uwee9umeAOzq3An39+rXRaDQajXa7XSgUxsfHK5VKtVp92B332dnZ+vp68pX+l7ler7958yZ56Dw9Pf3LL7881LK1Wq3T09OvX79eXFw0m81ms9lZfaVSaXp6emZmplKpDP1MiEy3jR+5BqEfAgwAAVwDBoAAAgwAAQQYAAIIMAAEEGAACCDAABBAgAEggAADQAABBoAAAgwAAQQYAAIIMAAEEGAACCDAABBAgAEggAADQAABBoAAAgwAAQQYAAIIMAAEEGAACCDAABBAgAEggAADQAABBoAAAgwAAQQYAAIIMAAEEGAACCDAABBAgAEggAADQAABBoAAAgwAAQQYAAIIMAAEEGAACCDAABBAgAEggAADQAABBoAAAgwAAQQYAAIIMAAEEGAACCDAABBAgAEggAADQAABBoAAAgwAAQQYAAIIMAAEEGAACCDAABBAgAEggAADQAABBoAAAgwAAQQYAAIIMAAEEGAACCDAABBAgAEggAADQAABBoAAAgwAAQQYAAIIMAAEEGAACCDAABBAgAEggAADQAABBoAAAgwAAQQYAAIIMAAEEGAACCDAABBAgAEggAADQAABBoAAAgwAAQQYAAIIMAAEEGAACCDAABBAgAEggAADQAABBoAAAgwAAQQYAAIIMAAEEGAACCDAABBAgAEggAADQAABBoAAAgwAAQQYAAIIMAAEEGAACCDAABBAgAEggAADQAABBoAAAgwAAQQYAAIIMAAEEGAACCDAABBAgAEggAADQAABBoAAAgwAAQQYAAIIMAAEEGAACCDAABBAgAEggAADQAABBoAAAgwAAQQYAAIIMAAEEGAACCDAABBAgAEggAADQAABBoAAAgwAAQQYAAIIMAAEEGAACCDAABBAgAEggAADQAABBoAAAgwAAQQYAAIIMAAEEGAACCDAABBAgAEggAADQAABBoAAAgwAAQQYAAIIMAAEEGAACCDAABBAgAEggAADQAABBoAAAgwAAf4PPGCfSHTldqgAAAAASUVORK5CYII=" />
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