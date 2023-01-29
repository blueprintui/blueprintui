
export function removeAttributeValue(el: HTMLElement, attr: string, value: string) {
  const attrValue = (el.getAttribute(attr)?.split(' ') || []).filter(v => v !== value).join(' ');
  attrValue.length ? el.setAttribute(attr, attrValue) : el.removeAttribute(attr);
}

export function addAttributeValue(el: HTMLElement, attr: string, value: string) {
  el.setAttribute(attr, [...new Set([...(el.getAttribute(attr)?.split(' ') || []), value.trim()])].join(' ').trim());
}
