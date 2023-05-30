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
export class BaseButton extends LitElement implements HTMLButtonElement {
  /** turns the button into a toggle button */
  @property({ type: Boolean, reflect: true }) pressed: boolean;

  /** indicate the current "selected" state of various widgets */
  @property({ type: Boolean, reflect: true }) selected: boolean;

  /** indicate if a control is expanded or collapsed */
  @property({ type: Boolean, reflect: true }) expanded: boolean;

  /** makes the element not mutable, meaning the user can not interact with button */
  @property({ type: Boolean, reflect: true }) readonly: boolean;

  /** determines if element is mutable or focusable */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** default behavior of the button */
  @property({ type: String, reflect: true }) type: 'button' | 'submit';

  /** represents the name of the current <form> element as a string. */
  @property({ type: String, reflect: true }) name: string;

  /** determines the current value  */
  @property({ type: String }) value: string;

  @property({ type: Object }) popoverTargetElement: HTMLElement;

  @property({ type: String, attribute: 'popovertargetaction', reflect: true }) popoverTargetAction:
    | 'toggle'
    | 'show'
    | 'hide';

  @property({ type: String, attribute: 'popovertarget', reflect: true }) popovertarget: string;

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
