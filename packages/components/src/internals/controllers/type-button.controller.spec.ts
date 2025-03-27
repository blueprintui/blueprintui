import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { typeButton, stopEvent } from '@blueprintui/components/internals';
import { elementIsStable, createFixture, removeFixture, onceEvent, emulateClick } from '@blueprintui/test';

@typeButton<SubmitTypeButtonControllerTestElement>()
@customElement('submit-type-button-controller-test-element')
class SubmitTypeButtonControllerTestElement extends LitElement {
  @property({ type: Boolean }) accessor readonly: boolean;
  @property({ type: Boolean }) accessor disabled: boolean;
  @property({ type: String }) accessor type: 'button' | 'submit';
  @property({ type: String }) accessor value = '';
  @property({ type: String }) accessor name = '';
  declare readonly form: HTMLFormElement;
  declare _internals: ElementInternals;
  static formAssociated = true;
}

describe('submit behavior', () => {
  let button: SubmitTypeButtonControllerTestElement;
  let buttonInForm: SubmitTypeButtonControllerTestElement;
  let submitButtonInForm: SubmitTypeButtonControllerTestElement;
  let fixture: HTMLElement;
  let form: HTMLFormElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <submit-type-button-controller-test-element></submit-type-button-controller-test-element>
      <form>
        <submit-type-button-controller-test-element type="button"></submit-type-button-controller-test-element>
        <submit-type-button-controller-test-element></submit-type-button-controller-test-element>
      </form>
    `);

    form = fixture.querySelector('form');
    form.addEventListener('submit', e => e.preventDefault());
    button = fixture.querySelectorAll<SubmitTypeButtonControllerTestElement>(
      'submit-type-button-controller-test-element'
    )[0];
    buttonInForm = fixture.querySelectorAll<SubmitTypeButtonControllerTestElement>(
      'submit-type-button-controller-test-element'
    )[1];
    submitButtonInForm = fixture.querySelectorAll<SubmitTypeButtonControllerTestElement>(
      'submit-type-button-controller-test-element'
    )[2];
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should initialize role button', async () => {
    await elementIsStable(button);
    expect(button._internals.role).toBe('button');
  });

  it('should not have a role if readonly', async () => {
    await elementIsStable(button);
    expect(button._internals.role).toBe('button');

    button.readonly = true;
    await elementIsStable(button);
    expect(button._internals.role).toBe(null);
  });

  it('should set the button type to submit if not defined and within a form element', async () => {
    await elementIsStable(button);
    expect(button.type).toBe(undefined);
    expect(buttonInForm.type).toBe('button');
    expect(submitButtonInForm.type).toBe('submit');
  });

  it('should add or remove button event listeners when readonly updates', async () => {
    await elementIsStable(submitButtonInForm);
    expect(submitButtonInForm.readonly).toBe(undefined);

    spyOn(submitButtonInForm, 'removeEventListener').and.callThrough();
    submitButtonInForm.readonly = true;
    await elementIsStable(submitButtonInForm);
    expect(submitButtonInForm.removeEventListener).toHaveBeenCalledWith('click', jasmine.any(Function));

    spyOn(submitButtonInForm, 'addEventListener').and.callThrough();
    submitButtonInForm.readonly = false;
    await elementIsStable(submitButtonInForm);
    expect(submitButtonInForm.addEventListener).toHaveBeenCalledWith('click', jasmine.any(Function));
  });

  it('should work with form elements when clicked; defaults to type="submit"', async () => {
    await elementIsStable(submitButtonInForm);
    form.addEventListener('submit', e => stopEvent(e));
    const eventPromise = onceEvent(form, 'submit');
    emulateClick(submitButtonInForm);
    const event = await eventPromise;
    expect(event instanceof SubmitEvent).toBe(true);
  });

  it('should assign submitter button when requesting form submit', async () => {
    await elementIsStable(submitButtonInForm);
    form.addEventListener('submit', e => stopEvent(e));
    const eventPromise = onceEvent(form, 'submit');
    emulateClick(submitButtonInForm);
    const event = await eventPromise;
    expect(event instanceof SubmitEvent).toBe(true);
    expect(event.submitter.localName).toBe('button');
  });

  // // todo: fix causes timeout
  // it('should work with form elements when clicked via keyboard; defaults to type="submit"', async () => {
  //   await elementIsStable(submitButtonInForm);
  //   const event = onceEvent(form, 'submit');
  //   submitButtonInForm.focus();
  //   submitButtonInForm.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));
  //   expect((await event) instanceof SubmitEvent).toBe(true);
  // });

  it('should not interact with form elements if type is button', async () => {
    submitButtonInForm.type = 'button';
    await elementIsStable(submitButtonInForm);
    const o = {
      f: () => {
        // Do nothing
      }
    };
    spyOn(o, 'f');
    form.addEventListener('submit', o.f);
    submitButtonInForm.click();
    const event = new KeyboardEvent('keyup', { key: 'Enter' });
    submitButtonInForm.focus();
    submitButtonInForm.dispatchEvent(event);
    expect(o.f).not.toHaveBeenCalled();
  });

  it('should handle dynamic changes in button type', async () => {
    const o = {
      f: () => {
        // Do nothing
      }
    };
    spyOn(o, 'f');

    // change from default (implicit "submit") to type="button"
    submitButtonInForm.type = 'button';
    await elementIsStable(submitButtonInForm);
    form.addEventListener('submit', o.f);
    emulateClick(submitButtonInForm);
    expect(o.f).not.toHaveBeenCalled();

    // change from type="button" to type="submit"
    submitButtonInForm.type = 'submit';
    await elementIsStable(submitButtonInForm);
    form.removeEventListener('submit', o.f);
    emulateClick(submitButtonInForm);

    // change from type="submit" to type="button"
    submitButtonInForm.type = 'button';
    await elementIsStable(submitButtonInForm);
    form.addEventListener('submit', o.f);
    emulateClick(submitButtonInForm);
    expect(o.f).not.toHaveBeenCalled();
  });

  it('should not interact with form elements if disabled (1)', async () => {
    submitButtonInForm.disabled = true;
    await elementIsStable(submitButtonInForm);
    const o = {
      f: () => {
        // Do nothing
      }
    };
    spyOn(o, 'f');
    form.addEventListener('submit', o.f);
    expect(o.f).not.toHaveBeenCalled();
  });

  it('should not interact with form elements if disabled (2)', async () => {
    submitButtonInForm.disabled = true;
    await elementIsStable(submitButtonInForm);
    const o = {
      f: () => {
        // Do nothing
      }
    };
    spyOn(o, 'f');
    form.addEventListener('submit', o.f);
    expect(o.f).not.toHaveBeenCalled();
  });
});
