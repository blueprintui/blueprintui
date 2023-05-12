import { html } from 'lit';
import { BpDivider } from '@blueprintui/components/divider';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';
import '@blueprintui/components/include/divider.js';

describe('divider element', () => {
  describe('render: ', () => {
    let fixture: HTMLElement;
    let element: BpDivider;

    beforeEach(async () => {
      fixture = await createFixture(html`<bp-divider></bp-divider>`);
      element = fixture.querySelector<BpDivider>('bp-divider');
    });

    afterEach(() => {
      removeFixture(fixture);
    });

    it('should create the component', async () => {
      await elementIsStable(element);
      expect(element).not.toBe(null);
    });

    it('should default aria role to separator', async () => {
      await elementIsStable(element);
      expect((element as any)._internals.role).toBe('separator');
    });

    it('should default aria orientation to horizontal', async () => {
      await elementIsStable(element);
      expect((element as any)._internals.ariaOrientation).toBe('horizontal');
    });

    it('should update aria orientation when orientation is set', async () => {
      await elementIsStable(element);
      expect((element as any)._internals.ariaOrientation).toBe('horizontal');

      element.orientation = 'vertical';
      await elementIsStable(element);
      expect((element as any)._internals.ariaOrientation).toBe('vertical');
    });
  });
});
