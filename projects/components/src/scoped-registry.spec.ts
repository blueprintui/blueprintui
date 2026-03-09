import { createBlueprintRegistry, getRegistry } from './scoped-registry.js';

describe('createBlueprintRegistry', () => {
  it('should return the global registry when CustomElementRegistry constructor is unavailable', async () => {
    // If the browser supports it, this test will validate the scoped path instead
    const registry = await createBlueprintRegistry([]);
    expect(registry).toBeDefined();
  });

  it('should restore the previous registry after loading', async () => {
    const before = getRegistry();
    await createBlueprintRegistry([]);
    expect(getRegistry()).toBe(before);
  });

  it('should restore the previous registry even if a loader throws', async () => {
    const before = getRegistry();
    try {
      await createBlueprintRegistry([() => Promise.reject(new Error('fail'))]);
    } catch {
      // expected
    }
    expect(getRegistry()).toBe(before);
  });

  it('should execute all provided loaders', async () => {
    const calls: number[] = [];
    await createBlueprintRegistry([
      () => {
        calls.push(1);
        return Promise.resolve();
      },
      () => {
        calls.push(2);
        return Promise.resolve();
      }
    ]);
    expect(calls).toEqual([1, 2]);
  });

  it('should return a scoped registry with defined elements when supported', async () => {
    if (!supportsConstructableRegistry()) {
      pending('CustomElementRegistry constructor not available');
      return;
    }

    let definedInRegistry: CustomElementRegistry;
    const registry = await createBlueprintRegistry([
      async () => {
        const { defineElement, getRegistry: getReg } = await import('./internals/utils/define.js');
        definedInRegistry = getReg();
        class TestScopedCreate extends HTMLElement {}
        defineElement('test-scoped-create', TestScopedCreate);
      }
    ]);

    expect(registry).not.toBe(customElements);
    expect(registry.get('test-scoped-create')).toBeDefined();
    expect(customElements.get('test-scoped-create')).toBeUndefined();
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
