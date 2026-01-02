import { createId } from './id.js';

export type Alignment = 'start' | 'end';
export type Side = 'top' | 'right' | 'bottom' | 'left';
export type AlignedPosition = `${Side}-${Alignment}`;
export type Position = Side | AlignedPosition | 'center';

export function setupCSSAnchor(anchor: HTMLElement, target: HTMLElement): string {
  if (!anchor.style.anchorName) {
    anchor.style.anchorName = `--${createId()}`;
  }
  target.style.positionAnchor = anchor.style.anchorName;
  return anchor.style.anchorName;
}

export function getPositionArea(position: Position): string {
  const positionMap: Record<Position, string> = {
    center: 'center',
    top: 'top center',
    'top-start': 'top span-right',
    'top-end': 'top span-left',
    bottom: 'bottom center',
    'bottom-start': 'bottom span-right',
    'bottom-end': 'bottom span-left',
    right: 'right center',
    'right-start': 'right span-bottom',
    'right-end': 'right span-top',
    left: 'left center',
    'left-start': 'left span-bottom',
    'left-end': 'left span-top'
  };
  return positionMap[position] ?? 'bottom center';
}
