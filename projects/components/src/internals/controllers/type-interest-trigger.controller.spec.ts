import { html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { elementIsStable, createFixture, removeFixture, onceEvent } from '@blueprintui/test';
import { BaseButton } from '../components/button.js';

@customElement('type-interest-trigger-controller-test-element')
class TypeInterestTriggerControllerTestElement extends BaseButton {}

describe('interest behavior', () => {
  let button: TypeInterestTriggerControllerTestElement;
  let target: HTMLElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <type-interest-trigger-controller-test-element
        interestfor="target"></type-interest-trigger-controller-test-element>
      <div id="target"></div>
    `);
    button = fixture.querySelector<TypeInterestTriggerControllerTestElement>(
      'type-interest-trigger-controller-test-element'
    );
    target = fixture.querySelector<HTMLElement>('#target');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should initialize interestForElement', async () => {
    await elementIsStable(button);
    expect(button.interestForElement).toBe(target);
  });

  it('should dispatch interest event on focus', async () => {
    await elementIsStable(button);
    const event = onceEvent(target, 'interest');
    button.dispatchEvent(new FocusEvent('focus'));
    const interestEvent = await event;
    expect(interestEvent.source).toBe(button);
  });

  it('should dispatch interest event on mouseenter', async () => {
    await elementIsStable(button);
    const event = onceEvent(target, 'interest');
    button.dispatchEvent(new MouseEvent('mouseenter'));
    const interestEvent = await event;
    expect(interestEvent.source).toBe(button);
  });

  it('should dispatch loseinterest event on focusout', async () => {
    await elementIsStable(button);
    const event = onceEvent(target, 'loseinterest');
    button.dispatchEvent(new FocusEvent('focusout'));
    const loseInterestEvent = await event;
    expect(loseInterestEvent.source).toBe(button);
  });

  it('should dispatch loseinterest event on mouseleave', async () => {
    await elementIsStable(button);
    const event = onceEvent(target, 'loseinterest');
    button.dispatchEvent(new MouseEvent('mouseleave'));
    const loseInterestEvent = await event;
    expect(loseInterestEvent.source).toBe(button);
  });

  it('should update interestForElement when interestfor attribute changes', async () => {
    await elementIsStable(button);
    expect(button.interestForElement).toBe(target);

    const newTarget = document.createElement('div');
    newTarget.id = 'new-target';
    fixture.appendChild(newTarget);

    button.setAttribute('interestfor', 'new-target');
    await elementIsStable(button);
    expect(button.interestForElement).toBe(newTarget);
  });

  it('should not dispatch interest event when interestForElement is not set', async () => {
    button.removeAttribute('interestfor');
    await elementIsStable(button);

    let eventFired = false;
    target.addEventListener('interest', () => (eventFired = true));
    button.dispatchEvent(new FocusEvent('focus'));
    await elementIsStable(button);
    expect(eventFired).toBe(false);
  });
});
