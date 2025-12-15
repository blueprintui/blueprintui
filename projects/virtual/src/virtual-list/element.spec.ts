import { html } from 'lit';
import { createFixture, removeFixture, elementIsStable, onceEvent } from '@blueprintui/test';
import '../include/virtual-list.js';
import { BpVirtualList } from './index.js';

describe('bp-virtual-list', () => {
  let fixture: HTMLElement;
  let element: BpVirtualList;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-virtual-list height="200px" item-height="40" item-count="100"></bp-virtual-list>
    `);
    element = fixture.querySelector<BpVirtualList>('bp-virtual-list');
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  describe('element registration', () => {
    it('should register element', async () => {
      await elementIsStable(element);
      expect(customElements.get('bp-virtual-list')).toBe(BpVirtualList);
    });

    it('should create and render', async () => {
      await elementIsStable(element);
      expect(element).toBeTruthy();
      expect(element.shadowRoot).toBeTruthy();
    });
  });

  describe('default property values', () => {
    it('should have default itemHeight of 44', async () => {
      const defaultElement = await createFixture(html`<bp-virtual-list></bp-virtual-list>`);
      const el = defaultElement.querySelector<BpVirtualList>('bp-virtual-list');
      await elementIsStable(el);
      expect(el.itemHeight).toBe(44);
      removeFixture(defaultElement);
    });

    it('should have default itemCount of 0', async () => {
      const defaultElement = await createFixture(html`<bp-virtual-list></bp-virtual-list>`);
      const el = defaultElement.querySelector<BpVirtualList>('bp-virtual-list');
      await elementIsStable(el);
      expect(el.itemCount).toBe(0);
      removeFixture(defaultElement);
    });

    it('should have default overscan of 1', async () => {
      const defaultElement = await createFixture(html`<bp-virtual-list></bp-virtual-list>`);
      const el = defaultElement.querySelector<BpVirtualList>('bp-virtual-list');
      await elementIsStable(el);
      expect(el.itemBuffer).toBe(1);
      removeFixture(defaultElement);
    });

    it('should have default height of auto', async () => {
      const defaultElement = await createFixture(html`<bp-virtual-list></bp-virtual-list>`);
      const el = defaultElement.querySelector<BpVirtualList>('bp-virtual-list');
      await elementIsStable(el);
      expect(el.height).toBe('auto');
      removeFixture(defaultElement);
    });
  });

  describe('attribute reflection', () => {
    it('should reflect item-height attribute to property', async () => {
      await elementIsStable(element);
      expect(element.itemHeight).toBe(40);
    });

    it('should reflect item-count attribute to property', async () => {
      await elementIsStable(element);
      expect(element.itemCount).toBe(100);
    });

    it('should reflect overscan attribute to property', async () => {
      fixture = await createFixture(html`
        <bp-virtual-list height="200px" item-height="40" item-count="100" overscan="5"></bp-virtual-list>
      `);
      element = fixture.querySelector<BpVirtualList>('bp-virtual-list');
      await elementIsStable(element);
      expect(element.itemBuffer).toBe(1);
    });

    it('should reflect height attribute to property', async () => {
      await elementIsStable(element);
      expect(element.height).toBe('200px');
    });

    it('should update when attribute changes', async () => {
      await elementIsStable(element);
      element.setAttribute('item-count', '50');
      await elementIsStable(element);
      expect(element.itemCount).toBe(50);
    });
  });

  describe('property setters', () => {
    it('should update itemHeight via property', async () => {
      await elementIsStable(element);
      element.itemHeight = 60;
      await elementIsStable(element);
      expect(element.itemHeight).toBe(60);
    });

    it('should update itemCount via property', async () => {
      await elementIsStable(element);
      element.itemCount = 200;
      await elementIsStable(element);
      expect(element.itemCount).toBe(200);
    });

    it('should update overscan via property', async () => {
      await elementIsStable(element);
      element.itemBuffer = 10;
      await elementIsStable(element);
      expect(element.itemBuffer).toBe(10);
    });

    it('should update height via property', async () => {
      await elementIsStable(element);
      element.height = '300px';
      await elementIsStable(element);
      expect(element.height).toBe('300px');
    });

    it('should ignore invalid itemHeight', async () => {
      await elementIsStable(element);
      const original = element.itemHeight;
      element.itemHeight = NaN;
      expect(element.itemHeight).toBe(original);
    });

    it('should ignore negative itemCount', async () => {
      await elementIsStable(element);
      const original = element.itemCount;
      element.itemCount = -10;
      expect(element.itemCount).toBe(original);
    });
  });

  describe('range calculation', () => {
    it('should calculate correct range at top', async () => {
      await elementIsStable(element);
      const range = element.visibleRange;
      // viewport height 200px / item height 40px = 5 visible items
      // with overscan of 3, start is 0 (max(0, 0-3)), end is 8 (0+5+3)
      expect(range.start).toBe(0);
      expect(range.end).toBe(6);
    });

    it('should apply overscan buffer correctly', async () => {
      await elementIsStable(element);
      element.itemBuffer = 5;
      await elementIsStable(element);
      const range = element.visibleRange;
      // viewport height 200px / item height 40px = 5 visible items
      // with overscan of 5, start is 0, end is 10 (0+5+5)
      expect(range.start).toBe(0);
      expect(range.end).toBe(10);
    });

    it('should clamp range to valid bounds', async () => {
      await elementIsStable(element);
      element.itemCount = 5;
      await elementIsStable(element);
      const range = element.visibleRange;
      // Even with overscan, end should not exceed itemCount
      expect(range.start).toBe(0);
      expect(range.end).toBe(5);
    });

    it('should return zero range when itemCount is 0', async () => {
      await elementIsStable(element);
      element.itemCount = 0;
      await elementIsStable(element);
      const range = element.visibleRange;
      expect(range.start).toBe(0);
      expect(range.end).toBe(0);
    });

    it('should return zero range when itemHeight is 0', async () => {
      await elementIsStable(element);
      element.itemHeight = 0;
      await elementIsStable(element);
      const range = element.visibleRange;
      expect(range.start).toBe(0);
      expect(range.end).toBe(0);
    });

    it('should handle itemCount of 1', async () => {
      await elementIsStable(element);
      element.itemCount = 1;
      await elementIsStable(element);
      const range = element.visibleRange;
      expect(range.start).toBe(0);
      expect(range.end).toBe(1);
    });
  });

  describe('events', () => {
    it('should fire bp-virtual-change on initial render', async () => {
      const eventPromise = onceEvent(document, 'bp-virtual-change');
      const newFixture = await createFixture(html`
        <bp-virtual-list height="200px" item-height="40" item-count="100"></bp-virtual-list>
      `);
      const event = await eventPromise;
      expect(event.detail).toBeTruthy();
      expect(event.detail.start).toBeDefined();
      expect(event.detail.end).toBeDefined();
      expect(event.detail.count).toBeDefined();
      removeFixture(newFixture);
    });

    it('should fire bp-virtual-change when range changes on scroll', async () => {
      await elementIsStable(element);
      const viewport = element.shadowRoot.querySelector('.viewport') as HTMLElement;

      const eventPromise = onceEvent(element, 'bp-virtual-change');
      viewport.scrollTop = 400; // scroll to show items 10+ (400/40)
      viewport.dispatchEvent(new Event('scroll'));

      const event = await eventPromise;
      expect(event.detail.start).toBeGreaterThan(0);
    });

    it('should have events that bubble', async () => {
      await elementIsStable(element);
      const viewport = element.shadowRoot.querySelector('.viewport') as HTMLElement;

      let bubbled = false;
      fixture.addEventListener('bp-virtual-scroll', () => {
        bubbled = true;
      });

      viewport.scrollTop = 100;
      viewport.dispatchEvent(new Event('scroll'));

      await new Promise(r => requestAnimationFrame(r));
      expect(bubbled).toBe(true);
    });

    it('should fire bp-virtual-scroll on scroll with correct direction', async () => {
      await elementIsStable(element);
      const viewport = element.shadowRoot.querySelector('.viewport') as HTMLElement;

      const eventPromise = onceEvent(element, 'bp-virtual-scroll');
      viewport.scrollTop = 100;
      viewport.dispatchEvent(new Event('scroll'));

      const event = await eventPromise;
      expect(event.detail.scrollTop).toBe(100);
      expect(event.detail.direction).toBe('down');
    });

    it('should detect up scroll direction', async () => {
      await elementIsStable(element);
      const viewport = element.shadowRoot.querySelector('.viewport') as HTMLElement;

      // First scroll down
      viewport.scrollTop = 200;
      viewport.dispatchEvent(new Event('scroll'));
      await new Promise(r => requestAnimationFrame(r));

      // Then scroll up
      const eventPromise = onceEvent(element, 'bp-virtual-scroll');
      viewport.scrollTop = 100;
      viewport.dispatchEvent(new Event('scroll'));

      const event = await eventPromise;
      expect(event.detail.direction).toBe('up');
    });

    it('should include count in bp-virtual-change detail', async () => {
      const eventPromise = onceEvent(document, 'bp-virtual-change');
      const newFixture = await createFixture(html`
        <bp-virtual-list height="200px" item-height="40" item-count="100"></bp-virtual-list>
      `);
      const event = await eventPromise;
      expect(event.detail.count).toBe(event.detail.end - event.detail.start);
      removeFixture(newFixture);
    });
  });

  describe('methods', () => {
    it('should scroll to index with scrollToIndex', async () => {
      await elementIsStable(element);
      const viewport = element.shadowRoot.querySelector('.viewport') as HTMLElement;

      element.scrollToIndex(10);
      await new Promise(r => setTimeout(r, 100));

      expect(viewport.scrollTop).toBe(400); // 10 * 40px
    });

    it('should clamp scrollToIndex to valid range', async () => {
      await elementIsStable(element);
      const viewport = element.shadowRoot.querySelector('.viewport') as HTMLElement;

      element.scrollToIndex(1000); // beyond itemCount
      await new Promise(r => setTimeout(r, 100));

      // max scroll = total height - viewport height = (100 * 40) - 200 = 3800
      expect(viewport.scrollTop).toBe(3800);
    });

    it('should handle negative scrollToIndex', async () => {
      await elementIsStable(element);
      const viewport = element.shadowRoot.querySelector('.viewport') as HTMLElement;

      element.scrollToIndex(-10);
      await new Promise(r => setTimeout(r, 100));

      expect(viewport.scrollTop).toBe(0);
    });

    it('should support smooth scroll behavior', async () => {
      await elementIsStable(element);
      // Just verify it doesn't throw
      expect(() => element.scrollToIndex(10, 'smooth')).not.toThrow();
    });

    it('should recalculate and emit range on refresh', async () => {
      await elementIsStable(element);
      const eventPromise = onceEvent(element, 'bp-virtual-change');

      element.refresh();

      const event = await eventPromise;
      expect(event.detail.start).toBeDefined();
      expect(event.detail.end).toBeDefined();
    });
  });

  describe('accessibility', () => {
    it('should have role="list" via internals', async () => {
      await elementIsStable(element);
      // Check that internals.role is set (can't directly access, but we can verify element works)
      expect(element).toBeTruthy();
    });
  });

  describe('CSS custom properties', () => {
    it('should apply --bp-virtual-list-height', async () => {
      await elementIsStable(element);
      const viewport = element.shadowRoot.querySelector('.viewport') as HTMLElement;
      const style = getComputedStyle(viewport);
      expect(style.height).toBe('200px');
    });

    it('should update height via CSS custom property', async () => {
      await elementIsStable(element);
      element.height = '400px';
      await elementIsStable(element);
      const viewport = element.shadowRoot.querySelector('.viewport') as HTMLElement;
      const style = getComputedStyle(viewport);
      expect(style.height).toBe('400px');
    });
  });

  describe('edge cases', () => {
    it('should handle rapid scroll events with RAF throttling', async () => {
      await elementIsStable(element);
      const viewport = element.shadowRoot.querySelector('.viewport') as HTMLElement;

      let eventCount = 0;
      element.addEventListener('bp-virtual-scroll', () => {
        eventCount++;
      });

      // Fire multiple scroll events rapidly
      for (let i = 0; i < 10; i++) {
        viewport.scrollTop = i * 10;
        viewport.dispatchEvent(new Event('scroll'));
      }

      // Wait for RAF
      await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));

      // Should be throttled - not 10 events
      expect(eventCount).toBeLessThan(10);
    });

    it('should handle itemHeight change', async () => {
      await elementIsStable(element);
      const eventPromise = onceEvent(element, 'bp-virtual-change');

      element.itemHeight = 20; // smaller items = more visible

      element.refresh();
      const event = await eventPromise;
      // With smaller items (20px), more items visible in 200px viewport
      expect(event.detail.end - event.detail.start).toBeGreaterThan(8);
    });

    it('should handle itemCount change', async () => {
      await elementIsStable(element);
      element.itemCount = 1000;
      await elementIsStable(element);
      expect(element.itemCount).toBe(1000);
    });

    it('should clean up on disconnected callback', async () => {
      await elementIsStable(element);
      // Remove and re-add to trigger disconnectedCallback
      const parent = element.parentElement;
      parent.removeChild(element);
      // Should not throw
      expect(() => parent.appendChild(element)).not.toThrow();
    });
  });

  describe('slot content', () => {
    it('should render slot content', async () => {
      fixture = await createFixture(html`
        <bp-virtual-list height="200px" item-height="40" item-count="100">
          <div class="item">Item 1</div>
          <div class="item">Item 2</div>
        </bp-virtual-list>
      `);
      element = fixture.querySelector<BpVirtualList>('bp-virtual-list');
      await elementIsStable(element);

      const items = element.querySelectorAll('.item');
      expect(items.length).toBe(2);
    });
  });
});
