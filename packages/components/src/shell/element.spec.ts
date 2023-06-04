import { html } from 'lit';
import { BpShell } from '@blueprintui/components/shell';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';
import type { BpHeaderItem } from '@blueprintui/components/header';
import '@blueprintui/components/include/shell.js';
import '@blueprintui/components/include/header.js';
import '@blueprintui/components/include/nav.js';
import '@blueprintui/components/include/alert.js';
import '@blueprintui/icons/shapes/home.js';

describe('bp-shell', () => {
  let fixture: HTMLElement;
  let element: BpShell;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-shell>
        <bp-nav expanded>
          <bp-nav-item> <bp-icon shape="home"></bp-icon> item 1 </bp-nav-item>
          <bp-nav-item> <bp-icon shape="home"></bp-icon> item 2 </bp-nav-item>
          <bp-nav-item> <bp-icon shape="home"></bp-icon> item 3 </bp-nav-item>
        </bp-nav>
        <bp-header>
          <bp-header-item>header</bp-header-item>
          <bp-header-item bp-shell="drawer-button" aria-label="menu" bp-layout="inline:end"
            ><bp-icon size="lg"></bp-icon
          ></bp-header-item>
        </bp-header>
        <section bp-layout="block gap:md" style="height: 2000px">
          <h1 bp-text="heading">Shell</h1>
          <bp-alert-group status="success">
            <bp-alert>hello there</bp-alert>
          </bp-alert-group>
        </section>
      </bp-shell>
    `);
    element = fixture.querySelector<BpShell>('bp-shell');
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register element', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-shell')).toBe(BpShell);
  });

  it('should assign nav to the nav slot', async () => {
    await elementIsStable(element);
    expect(fixture.querySelector('bp-nav').slot).toBe('nav');
  });

  it('should assign header to the header slot', async () => {
    await elementIsStable(element);
    expect(fixture.querySelector('bp-header').slot).toBe('header');
  });

  it('should show drawer button if width is less than defined breakpoint', async () => {
    await elementIsStable(element);
    expect(fixture.querySelector<BpHeaderItem>('[bp-shell="drawer-button"]').hidden).toBe(false);
  });

  it('should not apply app-breakpoint layout if width is less than defined breakpoint', async () => {
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('[part=internal]').className).toBe('');
  });

  it('should use drawer if width is less than defined breakpoint', async () => {
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('bp-drawer')).toBeTruthy();
  });
});
