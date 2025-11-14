import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { baseStyles, attachInternals } from '@blueprintui/components/internals';
import styles from './element.css' with { type: 'css' };

/**
 * ```typescript
 * import '@blueprintui/components/include/skeleton.js';
 * ```
 *
 * ```html
 * <bp-skeleton></bp-skeleton>
 * ```
 *
 * @summary Skeleton provides a placeholder representation of content before it loads
 * @element bp-skeleton
 * @since 2.9.0
 * @cssprop --width - Width of the skeleton (default: 100%)
 * @cssprop --height - Height of the skeleton (default: 1rem)
 * @cssprop --background - Background color of the skeleton
 * @cssprop --border-radius - Border radius (controlled by shape attribute)
 */
export class BpSkeleton extends LitElement {
  /** Animation effect applied to the skeleton */
  @property({ type: String, reflect: true }) accessor effect: 'pulse' | 'sheen';

  /** Shape of the skeleton */
  @property({ type: String, reflect: true }) accessor shape: 'circle';

  static styles = [baseStyles, styles];

  declare _internals: ElementInternals;

  render() {
    return html`<div part="internal"></div>`;
  }

  connectedCallback() {
    super.connectedCallback();
    attachInternals(this);
    this._internals.role = 'presentation';
    this._internals.ariaLive = 'polite';
    this._internals.ariaLabel = 'Loading content';
  }
}
