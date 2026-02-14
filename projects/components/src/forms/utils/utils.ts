import type { FormLayout } from './interfaces.js';
import type { BpField } from '../field/element.js';
import type { BpFieldMessage } from '../field-message/element.js';

export const formLayouts: FormLayout[] = ['vertical', 'vertical-inline', 'horizontal', 'horizontal-inline', 'compact'];

export function updateFieldStatusState(field: BpField, messages: BpFieldMessage[]) {
  const message = messages.find(m => !m.hidden);
  const inputState = (field.inputControl as any)._internals?.states;
  const fieldState = field._internals.states;

  if (inputState) {
    fieldState?.delete('error');
    fieldState?.delete('success');
    inputState?.delete('error');
    inputState?.delete('success');

    if (!message?.hidden && message?.status?.length) {
      inputState.add(message.status);
      fieldState.add(message.status);
    }
  }
}

export function syncValidationMessages(field: BpField, messages: BpFieldMessage[]) {
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

    field.inputControl.addEventListener('user-invalid', () => {
      messages.forEach(message => message.setAttribute('hidden', ''));
      messages.find(message => field.inputControl.validity[message.error])?.removeAttribute('hidden');
    });

    field.inputControl.addEventListener('blur', () => {
      messages.forEach(message => message.setAttribute('hidden', ''));
      messages
        .find(message => field.inputControl.validity[message.error] === false || !message.hasAttribute('error'))
        ?.removeAttribute('hidden');
    });

    field.inputControl.addEventListener('input', () => {
      if (field.inputControl.validity.valid) {
        messages.filter(m => !m.hasAttribute('error')).forEach(m => m.removeAttribute('hidden'));
      }

      messages
        .filter(m => field.inputControl.validity.valid && m.error && !field.inputControl.validity[m.error])
        .forEach(message => message.setAttribute('hidden', ''));
    });

    field.inputControl.form?.addEventListener('reset', () => {
      messages.filter(m => m.error).forEach(message => message.setAttribute('hidden', ''));
    });

    field.addEventListener('reset', () => {
      messages.filter(m => m.error).forEach(message => message.setAttribute('hidden', ''));
    });
  }
}

export function isObjectLiteral(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
