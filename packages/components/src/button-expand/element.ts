import { html, PropertyValues } from 'lit';
import { property } from 'lit/decorators/property.js';
import { BpButtonIcon } from '@blueprintui/components/button-icon';
import styles from './element.css' assert { type: 'css' };

/**
 * Expand Button
 *
 * ```typescript
 * import '@blueprintui/components/include/button-expand.js';
 * ```
 *
 * ```html
 * <bp-button-expand expanded></bp-button-expand>
 * ```
 *
 * @element bp-button-expand
 * @slot - For projecting custom bp-icon
 */
export class BpButtonExpand extends BpButtonIcon {
  @property({ type: String }) action: 'vertical' | 'horizontal' = 'vertical';

  static get styles() {
    return [...super.styles, styles];
  }

  get #iconDirection() {
    if (this.action === 'vertical') {
      return this.expanded ? 'down' : 'right';
    } else if (this.action === 'horizontal') {
      return this.expanded ? 'left' : 'right';
    } else {
      return null;
    }
  }

  render() {
    return html`
      <div class="private-host">
        <slot><bp-icon shape="angle" .direction=${this.#iconDirection}></bp-icon></slot>
      </div>
    `;
  }

  constructor() {
    super();
    this.expanded = false;
  }

  firstUpdated(props: PropertyValues<this>) {
    super.firstUpdated(props);

    if (!this.readonly) {
      this._internals.ariaLabel = this._internals.ariaLabel?.length ? this._internals.ariaLabel : this.i18n.expand;
    }
  }
}
