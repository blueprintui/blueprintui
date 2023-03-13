import { html, LitElement, ReactiveController, ReactiveElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/components/test';
import { dynamicControllers, DynamicControllers } from '@blueprintui/components/internals';

let instances = 0;
export class TestController<T extends ReactiveElement> implements ReactiveController {
  constructor(private host: T) {
    this.host.addController(this);
  }

  hostConnected(): void {
    instances = 1;
  }
}

@dynamicControllers<DynamicControllersTestElement>()
@customElement('dynamic-controllers-test-element')
class DynamicControllersTestElement extends LitElement {
  declare static _controllers: Set<any>;
}

DynamicControllers.add(DynamicControllersTestElement, TestController);

describe('dynamic-controllers.controller', () => {
  let element: DynamicControllersTestElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`<dynamic-controllers-test-element></dynamic-controllers-test-element>`);
    element = fixture.querySelectorAll<DynamicControllersTestElement>('dynamic-controllers-test-element')[0];
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should dynamically initialize any controllers added ot the static _controllers property of a given element', async () => {
    await elementIsStable(element);
    expect(DynamicControllersTestElement._controllers.size).toBe(1);
    expect(instances).toBe(1);
  });
});
