import { html } from 'lit';
import '@blueprintui/components/include/button.js';
import { BpButton } from '@blueprintui/components/button';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/components/test';

describe('button element', () => {
  let fixture: HTMLElement;
  let element: BpButton;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-button>button</bp-button>`);
    element = fixture.querySelector<BpButton>('bp-button');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create the component', async () => {
    await elementIsStable(element);
    expect(element.innerText).toBe('button');
  });

  it('should default to status neutral', async () => {
    await elementIsStable(element);
    expect(element.status).toBe(undefined);
    expect(element.getAttribute('status')).toBe(null);
  });

  it('should default to action primary', async () => {
    await elementIsStable(element);
    expect(element.action).toBe('primary');
    expect(element.getAttribute('action')).toBe('primary');
  });
});
