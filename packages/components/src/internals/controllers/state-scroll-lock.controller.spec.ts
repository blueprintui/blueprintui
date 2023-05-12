import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';
// import { stateScrollLock } from '@blueprintui/components/internals';

// @stateScrollLock<StateScrollLockControllerTestElement>()
@customElement('state-scroll-lock-controller-test-element')
export class StateScrollLockControllerTestElement extends LitElement {}

describe('state-readonly.controller', () => {
  let element: StateScrollLockControllerTestElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(
      html`<state-scroll-lock-controller-test-element hidden></state-scroll-lock-controller-test-element>`
    );
    element = fixture.querySelector<StateScrollLockControllerTestElement>('state-scroll-lock-controller-test-element');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should default to not scroll locking body if hidden', async () => {
    await elementIsStable(element);
    expect(document.body.style.overflow).toBe('');
  });

  // it('should scroll lock body if not hidden', async () => {
  //   await elementIsStable(element);
  //   element.hidden = false;
  //   await elementIsStable(element);
  //   expect(document.body.style.overflow).toBe('hidden');
  // });

  // it('should remove scroll lock on body if removed from DOM', async () => {
  //   await elementIsStable(element);
  //   element.hidden = false;
  //   await elementIsStable(element);
  //   expect(document.body.style.overflow).toBe('hidden');

  //   element.remove();
  //   await elementIsStable(element);
  //   expect(document.body.style.overflow).toBe('');
  // });
});
