import type { Middleware, MiddlewareState } from '@floating-ui/dom';
import { getContainingBlock, getWindow, isContainingBlock } from '@floating-ui/utils/dom';

// https://github.com/floating-ui/floating-ui/issues/1842#issuecomment-1683240329
export const topLayerOverTransforms = (): Middleware => ({
  name: 'topLayer',
  async fn(middlewareArguments: MiddlewareState) {
    const {
      x,
      y,
      elements: { reference, floating }
    } = middlewareArguments;
    const diffCoords = { x: 0, y: 0 };
    let onTopLayer = false;
    let topLayerIsFloating = false;
    let withinReference = false;

    try {
      onTopLayer = onTopLayer || floating.matches(':popover-open');
      // eslint-disable-next-line no-empty
    } catch (error) {}
    try {
      onTopLayer = onTopLayer || floating.matches(':open');
      // eslint-disable-next-line no-empty
    } catch (error) {}
    try {
      onTopLayer = onTopLayer || floating.matches(':modal');
      // eslint-disable-next-line no-empty
    } catch (error) {}

    topLayerIsFloating = onTopLayer;
    const dialogAncestorQueryEvent = new Event('floating-ui-dialog-test', {
      composed: true,
      bubbles: true
    });
    floating.addEventListener(
      'floating-ui-dialog-test',
      (event: Event) => {
        (event.composedPath() as unknown as Element[]).forEach(el => {
          withinReference = withinReference || el === reference;
          if (el === floating || el.localName !== 'dialog') {
            return;
          }

          try {
            onTopLayer = onTopLayer || el.matches(':modal');
            // eslint-disable-next-line no-empty
          } catch (error) {}
        });
      },
      { once: true }
    );
    floating.dispatchEvent(dialogAncestorQueryEvent);
    let overTransforms = false;

    const root = (withinReference ? reference : floating) as Element;
    const containingBlock = isContainingBlock(root) ? root : getContainingBlock(root);
    if (containingBlock !== null && getWindow(containingBlock) !== (containingBlock as unknown as Window)) {
      const css = getComputedStyle(containingBlock);
      overTransforms = css.transform !== 'none' || css.filter ? css.filter !== 'none' : false;
    }

    if (onTopLayer && overTransforms && containingBlock) {
      const rect = containingBlock.getBoundingClientRect();
      diffCoords.x = rect.x;
      diffCoords.y = rect.y;
    }

    if (onTopLayer && topLayerIsFloating) {
      return {
        x: x + diffCoords.x,
        y: y + diffCoords.y,
        data: diffCoords
      };
    }

    if (onTopLayer) {
      return {
        x,
        y,
        data: diffCoords
      };
    }

    return {
      x: x - diffCoords.x,
      y: y - diffCoords.y,
      data: diffCoords
    };
  }
});
