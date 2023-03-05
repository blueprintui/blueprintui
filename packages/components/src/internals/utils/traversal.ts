export function getParents(node: Node): HTMLElement[] {
  const parents: HTMLElement[] = [];
  let parent = node?.parentNode || (node.getRootNode() as any).host;

  while (parent !== document) {
    if (parent instanceof HTMLElement) {
      parents.push(parent);
    } else if (parent instanceof ShadowRoot) {
      parents.push((parent.getRootNode() as any).host);
    }

    parent = (parent.getRootNode() as any)?.host || parent?.parentNode;
  }
  return parents;
}

export function getFlattenedDOMTree(node: Node, depth = 10): HTMLElement[] {
  return Array.from(getChildren(node))
    .reduce((prev: any[], next: any) => {
      return [...prev, [next, [...Array.from(getChildren(next)).map((i: any) => [i, getFlattenedDOMTree(i, depth)])]]];
    }, [])
    .flat(depth);
}

export function getChildren(node: any) {
  if (node.documentElement) {
    return node.documentElement.children;
  } else if (node.shadowRoot) {
    return node.shadowRoot.children;
  } else if (node.assignedElements) {
    const slotted = node.assignedElements(); // slotted elements
    return slotted.length ? slotted : node.children; // else slot fallback
  } else {
    return node.children;
  }
}

export function isObject(val: any) {
  return val?.constructor === Object;
}

export function mergeObjects(...objs: object[]): object {
  const clone: any = {};
  objs
    .map(o => (isObject(o) ? { ...o } : {}))
    .forEach((obj: any) => {
      Object.keys(obj).forEach(prop => {
        const propVal = obj[prop];

        if (Array.isArray(propVal)) {
          const initial = Array.isArray(clone[prop]) ? clone[prop] : [];
          clone[prop] = [...initial, ...Array.from(propVal)];
        } else if (isObject(propVal)) {
          clone[prop] = mergeObjects(clone[prop] || {}, propVal);
        } else {
          clone[prop] = propVal;
        }
      });
    });

  return clone;
}
