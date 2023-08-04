import { animate } from '@lit-labs/motion';
import type { DirectiveResult } from 'lit/directive.js';

export function fade(element: HTMLElement): DirectiveResult {
  const style = getComputedStyle(element);
  const easing = style.getPropertyValue('--animation-easing') || 'ease-in-out';
  const duration = parseInt(style.getPropertyValue('--animation-duration') || '200');
  return animate({
    skipInitial: true,
    properties: ['opacity'],
    keyframeOptions: {
      duration,
      easing
    }
  });
}
