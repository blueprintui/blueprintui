import { blueprintRegistry } from '@blueprintui/components';
import { elementIsStable } from '@blueprintui/test';
import '@blueprintui/components/include/dialog.js';
import { scopedRegistriesSupported } from './define.js';

describe('scoped registry', () => {
  it('registers bp-dialog in global scope when included', () => {
    expect(customElements.get('bp-dialog')).toBeDefined();
  });

  it('does not register bp-button-icon in global scope when only dialog is included', () => {
    if (!scopedRegistriesSupported) {
      pending('scoped registries not supported in this browser');
      return;
    }
    expect(customElements.get('bp-button-icon')).toBeUndefined();
  });

  it('does not register bp-icon in global scope when only dialog is included', () => {
    if (!scopedRegistriesSupported) {
      pending('scoped registries not supported in this browser');
      return;
    }
    expect(customElements.get('bp-icon')).toBeUndefined();
  });

  it('registers bp-button-icon in blueprintRegistry', () => {
    expect(blueprintRegistry.get('bp-button-icon')).toBeDefined();
  });

  it('registers bp-icon in blueprintRegistry', () => {
    expect(blueprintRegistry.get('bp-icon')).toBeDefined();
  });

  describe('bp-dialog shadow rendering', () => {
    let host: HTMLDivElement;

    beforeEach(async () => {
      host = document.createElement('div');
      document.body.appendChild(host);
      const shadow = host.attachShadow({ mode: 'open', customElementRegistry: blueprintRegistry });
      shadow.innerHTML = '<bp-dialog closable></bp-dialog>';
      await elementIsStable(shadow.querySelector('bp-dialog'));
    });

    afterEach(() => {
      host.remove();
    });

    it('bp-dialog shadow resolves bp-button-icon from blueprintRegistry', () => {
      const shadow = host.shadowRoot;
      const dialog = shadow.querySelector('bp-dialog');
      expect(dialog).toBeDefined();
      expect(dialog.shadowRoot.querySelector('bp-button-icon')).toBeDefined();
    });
  });
});
