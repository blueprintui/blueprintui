import { html } from 'lit';
import { FormLayout } from './interfaces.js';
import { BpField } from '../field/element.js';
import { BpFieldMessage } from '../field-message/element.js';

export const formLayouts: FormLayout[] = ['vertical', 'vertical-inline', 'horizontal', 'horizontal-inline', 'compact'];

export function updateFieldStatusState(field: BpField, messages: BpFieldMessage[]) {
  const message = messages.find(m => !m.hidden);
  const inputState = (field.inputControl as any)._internals?.states;
  const fieldState = field._internals.states;

  if (inputState) {
    fieldState?.delete('--error');
    fieldState?.delete('--success');
    inputState?.delete('--error');
    inputState?.delete('--success');

    if (!message?.hidden && message?.status?.length) {
      inputState.add(`--${message.status}`);
      fieldState.add(`--${message.status}`);
    }
  }
}

export function syncHTML5Validation(field: BpField, messages: BpFieldMessage[]) {
  if (!field.inputControl?.form?.noValidate && !field.inputControl.formNoValidate) {
    messages
      .filter(m => m.hasAttribute('error'))
      .forEach(m => {
        m.setAttribute('hidden', '');
        m.status = 'error';
      });

    field.inputControl.addEventListener('invalid', () => {
      messages.forEach(message => message.setAttribute('hidden', ''));
      messages.find(message => field.inputControl.validity[message.error])?.removeAttribute('hidden');
    });

    field.inputControl.addEventListener('input', () => {
      if (field.inputControl.validity.valid) {
        messages.filter(m => !m.hasAttribute('error')).forEach(m => m.removeAttribute('hidden'));
      }

      messages
        .filter(m => field.inputControl.validity.valid && m.error && !field.inputControl.validity[m.error])
        .forEach(message => message.setAttribute('hidden', ''));
    });
  }
}

export function getStatusIcon(status: '' | 'error' | 'success') {
  return status ? html`
    <bp-button-icon readonly class="status">
      ${status === 'error' ? html`<bp-icon status="danger" shape="exclamation-circle" size="sm" inner-offset="2"></bp-icon>` : ''}
      ${status === 'success' ? html`<bp-icon status="success" shape="check-circle" size="sm" inner-offset="2"></bp-icon>` : ''}
    </bp-button-icon>
  ` : '';
}
