
export function removeAttributeValue(el: HTMLElement, attr: string, value: string) {
  const values = el.getAttribute(attr)?.split(' ') || [];
  const attrValue = values.filter(v => v !== value).join(' ');
  attrValue.length ? el.setAttribute(attr, attrValue) : el.removeAttribute(attr);
}

export function addAttributeValue(el: HTMLElement, attr: string, value: string) {
  const values = new Set([...(el.getAttribute(attr)?.split(' ') || []), value.trim()]);
  el.setAttribute(attr, [...values].join(' ').trim());
}
