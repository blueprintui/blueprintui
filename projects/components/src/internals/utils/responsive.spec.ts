import { html } from 'lit';
import { BpField } from '@blueprintui/components/forms';
import { createFixture, removeFixture, elementIsStable } from '@blueprintui/test';
import { elementVisible } from '@blueprintui/components/internals';
import '@blueprintui/components/include/forms.js';

describe('responsive utilities', () => {
  let fixture: HTMLElement;
  let element: BpField;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-field layout="horizontal">
        <label>label</label>
        <input type="text" />
        <bp-field-message>message text</bp-field-message>
      </bp-field>
    `);

    element = fixture.querySelector<BpField>('bp-field');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  xit('should get optimal component layout', async () => {
    await elementIsStable(element);
    expect(element.layout).toBe('horizontal');

    element.style.width = '100px';

    // hacky workaround as we cant trigger resize observers manually in headless browsers
    (element as any).observers.filter((o: any) => o.__testTrigger).forEach((o: any) => o.__testTrigger());

    await elementIsStable(element);
    expect(element.layout).toBe('vertical');
  });
});

describe('visibility', () => {
  let fixture: HTMLElement;
  let element: HTMLParagraphElement;

  beforeEach(async () => {
    fixture = await createFixture(html` <p hidden>test</p> `);
    element = fixture.querySelector<HTMLParagraphElement>('p');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should determine when an element is visible', done => {
    elementVisible(element, () => {
      expect(element.hasAttribute('hidden')).toBe(false);
      done();
    });

    element.removeAttribute('hidden');
  });
});
