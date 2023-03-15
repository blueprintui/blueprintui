import { animate } from '@lit-labs/motion';

export function fade(element: HTMLElement) {
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
