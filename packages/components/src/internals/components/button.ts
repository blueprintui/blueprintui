import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { typeAnchor } from '../controllers/type-anchor.controller.js';
import { typeButton } from '../controllers/type-button.controller.js';
import { stateActive } from '../controllers/state-active.controller.js';
import { stateDisabled } from '../controllers/state-disabled.controller.js';
import { statePressed } from '../controllers/state-pressed.controller.js';
import { stateExpanded } from '../controllers/state-expanded.controller.js';
import { stateReadonly } from '../controllers/state-readonly.controller.js';
import { interactionClick } from '../controllers/interaction-click.controller.js';

@typeButton<BaseButton>()
@typeAnchor<BaseButton>()
@stateActive<BaseButton>()
@statePressed<BaseButton>()
@stateExpanded<BaseButton>()
@stateDisabled<BaseButton>()
@stateReadonly<BaseButton>()
@interactionClick<BaseButton>()
export class BaseButton extends LitElement implements HTMLButtonElement {
  @property({ type: Boolean, reflect: true }) pressed: boolean;

  @property({ type: Boolean, reflect: true }) expanded: boolean;

  @property({ type: Boolean, reflect: true }) readonly: boolean;

  @property({ type: Boolean, reflect: true }) disabled = false;

  @property({ type: String }) type: 'button' | 'submit';

  @property({ type: String }) name: string;

  @property({ type: String }) value: string;

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
    return html`<div interaction part="internal" ><slot></slot></div>`;
  }
}
