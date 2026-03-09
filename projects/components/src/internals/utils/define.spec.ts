import { LitElement, html } from 'lit';
import { defineElement, setRegistry, getRegistry } from '@blueprintui/components/internals';

describe('defineElement', () => {
  afterEach(() => {
    setRegistry(undefined);
  });

  it('should define an element on the global registry by default', () => {
    class TestDefineGlobal extends HTMLElement {}
    defineElement('test-define-global', TestDefineGlobal);
    expect(customElements.get('test-define-global')).toBe(TestDefineGlobal);
  });

  it('should not redefine an already-defined element', () => {
    class TestDefineOnce extends HTMLElement {}
    defineElement('test-define-once', TestDefineOnce);
    expect(() => defineElement('test-define-once', TestDefineOnce)).not.toThrow();
  });

  it('should set __meta on the element class', () => {
    class TestDefineMeta extends HTMLElement {
      static __meta: any;
    }
    defineElement('test-define-meta', TestDefineMeta);
    expect(TestDefineMeta.__meta).toEqual({ name: 'test-define-meta', version: '0.0.0' });
  });
});

describe('setRegistry / getRegistry', () => {
  afterEach(() => {
    setRegistry(undefined);
  });

  it('should return the global customElements by default', () => {
    expect(getRegistry()).toBe(customElements);
  });

  it('should return a custom registry after setRegistry', () => {
    if (!supportsConstructableRegistry()) {
      pending('CustomElementRegistry constructor not available');
      return;
    }
    const registry = new CustomElementRegistry();
    setRegistry(registry);
    expect(getRegistry()).toBe(registry);
  });

  it('should fall back to global when reset to undefined', () => {
    if (!supportsConstructableRegistry()) {
      pending('CustomElementRegistry constructor not available');
      return;
    }
    const registry = new CustomElementRegistry();
    setRegistry(registry);
    setRegistry(undefined);
    expect(getRegistry()).toBe(customElements);
  });
});

describe('defineElement with scoped registry', () => {
  afterEach(() => {
    setRegistry(undefined);
  });

  it('should define an element on the active scoped registry', () => {
    if (!supportsConstructableRegistry()) {
      pending('CustomElementRegistry constructor not available');
      return;
    }
    const registry = new CustomElementRegistry();
    setRegistry(registry);

    class TestScopedEl extends HTMLElement {}
    defineElement('test-scoped-el', TestScopedEl);

    expect(registry.get('test-scoped-el')).toBe(TestScopedEl);
    expect(customElements.get('test-scoped-el')).toBeUndefined();
  });

  it('should set shadowRootOptions.customElementRegistry for LitElement classes', () => {
    if (!supportsConstructableRegistry()) {
      pending('CustomElementRegistry constructor not available');
      return;
    }
    const registry = new CustomElementRegistry();
    setRegistry(registry);

    class TestScopedLit extends LitElement {
      static shadowRootOptions = { ...LitElement.shadowRootOptions };
      render() {
        return html`<slot></slot>`;
      }
    }

    defineElement('test-scoped-lit', TestScopedLit);
    expect((TestScopedLit as any).shadowRootOptions.customElementRegistry).toBe(registry);
  });

  it('should allow the same tag name in two different scoped registries', () => {
    if (!supportsConstructableRegistry()) {
      pending('CustomElementRegistry constructor not available');
      return;
    }
    const registry1 = new CustomElementRegistry();
    const registry2 = new CustomElementRegistry();

    class TestDup1 extends HTMLElement {}
    class TestDup2 extends HTMLElement {}

    setRegistry(registry1);
    defineElement('test-dup-tag', TestDup1);

    setRegistry(registry2);
    defineElement('test-dup-tag', TestDup2);

    expect(registry1.get('test-dup-tag')).toBe(TestDup1);
    expect(registry2.get('test-dup-tag')).toBe(TestDup2);
  });
});

function supportsConstructableRegistry(): boolean {
  try {
    new CustomElementRegistry();
    return true;
  } catch {
    return false;
  }
}
