import { html } from 'lit';
import { createFixture, removeFixture, elementIsStable, onceEvent, emulateClick } from '@blueprintui/test';
import { BpGridDetail } from './element.js';
import '@blueprintui/grid/include/core.js';
import '@blueprintui/grid-pro/include/detail.js';

describe('bp-grid-detail', () => {
  let element: BpGridDetail;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html` <bp-grid height="380">
      <bp-grid-column></bp-grid-column>
      <bp-grid-column>1</bp-grid-column>
      <bp-grid-column>2</bp-grid-column>
      <bp-grid-column>3</bp-grid-column>
      <bp-grid-column>4</bp-grid-column>
      <bp-grid-row>
        <bp-grid-cell>
          <button id="trigger-btn-1"></button>
        </bp-grid-cell>
        <bp-grid-cell role="rowheader">1</bp-grid-cell>
        <bp-grid-cell>2</bp-grid-cell>
        <bp-grid-cell>3</bp-grid-cell>
        <bp-grid-cell>4</bp-grid-cell>
      </bp-grid-row>
      <bp-grid-row>
        <bp-grid-cell>
          <button id="trigger-btn-2"></button>
        </bp-grid-cell>
        <bp-grid-cell role="rowheader">1</bp-grid-cell>
        <bp-grid-cell>2</bp-grid-cell>
        <bp-grid-cell>3</bp-grid-cell>
        <bp-grid-cell>4</bp-grid-cell>
      </bp-grid-row>
      <bp-grid-detail closable trigger="trigger-btn-2"> detail </bp-grid-detail>
    </bp-grid>`);
    element = fixture.querySelector<BpGridDetail>('bp-grid-detail');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create component', async () => {
    await elementIsStable(element);
    expect(element).toBeTruthy();
  });

  it('should have a default role of dialog and internal presentational roles', async () => {
    await elementIsStable(element);
    expect(element._internals.role).toBe('dialog');
    expect(element.shadowRoot.querySelector<HTMLElement>('dialog').role).toBe('presentation');
    expect(element.shadowRoot.querySelector<HTMLElement>('[part="pointer"]').role).toBe('presentation');
  });

  it('should dispatch a "close" event when the close button is clicked', async () => {
    await elementIsStable(element);
    const event = onceEvent(element, 'close');
    emulateClick(element.shadowRoot.querySelector<HTMLElement>('bp-button-icon'));
    expect(await event).toBeTruthy();
  });

  it('close button should have proper aria-label', async () => {
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector<HTMLElement>('bp-button-icon').ariaLabel).toBe('close');
  });

  it('close button should be hidden if not closable', async () => {
    element.closable = false;
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector<HTMLElement>('bp-button-icon')).toBeFalsy();
  });

  it('should show pointer if trigger is defined', async () => {
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector<HTMLElement>('[part="pointer"]')).toBeTruthy();

    element.trigger = undefined;
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector<HTMLElement>('[part="pointer"]')).toBeFalsy();
  });

  it('should set pointer position relative to anchor', async () => {
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector<HTMLElement>('[part="pointer"]')).toBeTruthy();
    expect(element.style.getPropertyValue('--pointer-top')).toBe('117px');
  });

  it('should set detail position relative to rowheader', async () => {
    await elementIsStable(element);
    expect(element.style.insetInlineStart).toBe('313px');
  });
});
