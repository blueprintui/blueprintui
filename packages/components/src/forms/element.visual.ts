import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { visualDiff } from '@web/test-runner-visual-regression';
import { createVisualFixture, removeFixture } from '@blueprintui/test';
import * as forms from './element.examples.js';
import '@blueprintui/components/include/forms.js';
import '@blueprintui/components/include/card.js';
import '@blueprintui/components/include/checkbox.js';
import '@blueprintui/components/include/file.js';
import '@blueprintui/components/include/input.js';
import '@blueprintui/components/include/month.js';
import '@blueprintui/components/include/password.js';
import '@blueprintui/components/include/radio.js';
import '@blueprintui/components/include/range.js';
import '@blueprintui/components/include/search.js';
import '@blueprintui/components/include/select.js';
import '@blueprintui/components/include/switch.js';
import '@blueprintui/components/include/month.js';
import '@blueprintui/components/include/textarea.js';
import '@blueprintui/components/include/time.js';

describe('bp-forms', () => {
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createVisualFixture(
      html` ${unsafeHTML(forms.control())} ${unsafeHTML(forms.controlGroup())} ${unsafeHTML(forms.validation())} `,
      { width: '800px', height: '800px' }
    );
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('modern light theme', async () => {
    await visualDiff(fixture, 'forms/modern.png');
  });

  it('modern dark theme', async () => {
    document.documentElement.setAttribute('bp-theme', 'modern modern-dark');
    await visualDiff(fixture, 'forms/modern-dark.png');
  });
});
