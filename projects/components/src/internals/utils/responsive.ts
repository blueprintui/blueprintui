import { LitElement } from 'lit';

export function elementVisible(element: HTMLElement, fn: () => void) {
  const observer = new IntersectionObserver(
    entries => {
      if (entries[0].isIntersecting === true) {
        fn();
      }
    },
    { threshold: [0] }
  );

  observer.observe(element);
  return observer;
}

export function elementResize(element: HTMLElement, fn: () => void, async = true) {
  const observer = new ResizeObserver(() => {
    if (async) {
      window.requestAnimationFrame(() => fn()); // prevents "ResizeObserver loop limit exceeded" error
    } else {
      fn();
    }
  });
  observer.observe(element);
  return observer;
}

export type ResponsiveComponent = LitElement & { layout: string; responsive: boolean; layoutStable: boolean };

export interface LayoutConfig {
  layouts: string[];
  initialLayout: string;
}

/**
 * This function loops through a list of layout options and changes the layout
 * of ResponsiveComponent until the component layout condition is met.
 */
export function calculateOptimalLayout(component: ResponsiveComponent, layoutConfig: LayoutConfig): Promise<boolean> {
  return component.updateComplete.then(() => {
    const currentLayout = component.layout;
    component.layout = layoutConfig.layouts[0];

    return component.responsive
      ? layoutConfig.layouts
          .reduce(
            (prev, next) =>
              prev.then(() => {
                if (component.layout === layoutConfig.initialLayout) {
                  return next;
                } else {
                  const prev = component.layout;
                  component.layout = next;

                  return component.updateComplete.then(() => {
                    component.layout = component.layoutStable ? component.layout : prev;
                    return next;
                  });
                }
              }),
            Promise.resolve<string>(layoutConfig.layouts[0])
          )
          .then(() => currentLayout !== component.layout)
      : true;
  });
}
