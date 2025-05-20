import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { typeAnchor } from '../controllers/type-anchor.controller.js';
import { typeButton } from '../controllers/type-button.controller.js';
import { stateActive } from '../controllers/state-active.controller.js';
import { stateDisabled } from '../controllers/state-disabled.controller.js';
import { statePressed } from '../controllers/state-pressed.controller.js';
import { stateSelected } from '../controllers/state-selected.controller.js';
import { stateExpanded } from '../controllers/state-expanded.controller.js';
import { stateReadonly } from '../controllers/state-readonly.controller.js';
import { interactionClick } from '../controllers/interaction-click.controller.js';
import { typePopoverTrigger } from '../controllers/type-popover-trigger.controller.js';
import { BpTypeButton } from '../types/index.js';

@typeButton<BaseButton>()
@typeAnchor<BaseButton>()
@typePopoverTrigger<BaseButton>()
@stateActive<BaseButton>()
@statePressed<BaseButton>()
@stateSelected<BaseButton>()
@stateExpanded<BaseButton>()
@stateDisabled<BaseButton>()
@stateReadonly<BaseButton>()
@interactionClick<BaseButton>()
export class BaseButton extends LitElement implements Pick<BpTypeButton, keyof BaseButton> {
  /** turns the button into a toggle button */
  @property({ type: Boolean }) accessor pressed: boolean;

  /** indicate the current "selected" state of various widgets */
  @property({ type: Boolean }) accessor selected: boolean;

  /** indicate if a control is expanded or collapsed */
  @property({ type: Boolean }) accessor expanded: boolean;

  /** makes the element not mutable, meaning the user can not interact with button */
  @property({ type: Boolean }) accessor readonly: boolean;

  /** determines if element is mutable or focusable */
  @property({ type: Boolean }) accessor disabled = false;

  /** default behavior of the button */
  @property({ type: String, reflect: true }) accessor type: 'button' | 'submit';

  /** represents the name of the current <form> element as a string. */
  @property({ type: String, reflect: true }) accessor name: string;

  /** determines the current value  */
  @property({ type: String }) accessor value: string;

  /**
   * The target element for the popover
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button#popovertarget
   */
  @property({ type: Object }) accessor popoverTargetElement: HTMLElement;

  /**
   * The action to perform on the target popover element
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button#popovertargetaction
   */
  @property({ type: String, attribute: 'popovertargetaction', reflect: true }) accessor popoverTargetAction:
    | 'toggle'
    | 'show'
    | 'hide';

  /**
   * The target popover id
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button#popovertarget
   */
  @property({ type: String, attribute: 'popovertarget', reflect: true }) accessor popovertarget: string;

  /**
   * The command property of the HTMLButtonElement interface gets and sets the action to be performed on an element being controlled by this button. For this to have an effect, commandfor must be set.
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button#command
   */
  @property({ type: String }) accessor command: string;

  /**
   * The command for property of the HTMLButtonElement interface gets and sets the id of the element being controlled by this button. For this to have an effect, command must be set.
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button#command
   */
  @property({ type: String }) accessor commandFor: string;

  declare readonly form: HTMLFormElement;

  declare readonly formAction: string;

  declare readonly formEnctype: string;

  declare readonly formMethod: string;

  declare readonly formNoValidate: boolean;

  declare readonly formTarget: string;

  declare readonly labels: NodeListOf<HTMLLabelElement>;

  declare readonly validationMessage: string;

  declare readonly validity: ValidityState;

  declare readonly willValidate: boolean;

  declare readonly checkValidity: any;

  declare readonly reportValidity: any;

  declare readonly setCustomValidity: any;

  /** @private */
  declare readonly _internals: ElementInternals;

  static formAssociated = true;

  render() {
    return html`<div interaction part="internal"><slot></slot></div>`;
  }
}
