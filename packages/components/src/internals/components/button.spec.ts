
import { html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { BaseButton } from '@blueprintui/components/internals';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/components/test';

@customElement('base-button-test')
class BaseButtonTest extends BaseButton { }

describe('base button element', () => {
  let fixture: HTMLElement;
  let element: BaseButtonTest;

  beforeEach(async () => {
    fixture = await createFixture(html`<base-button-test>test</base-button-test>`);
    element = fixture.querySelector<BaseButtonTest>('base-button-test');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create the component', async () => {
    await elementIsStable(element);
    expect(element.innerText).toBe('test');
  });
});
