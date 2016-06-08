export function $trigger(eventType, element) {
  const event = document.createEvent('HTMLEvents');
  event.initEvent(eventType, true, false);
  (element || window).dispatchEvent(event);
}

export function $on(element, eventType, handler) {
  return (element || window).addEventListener(eventType, handler);
}

export function $ge(id) {
  return document.getElementById(id);
}

//todo: reverse order of parameters
export function $gc(element, className) {
  return (element || document).getElementsByClassName(className);
}

//todo: reverse order of parameters
export function $gt(element, tagName) {
  return (element || document).getElementsByTagName(tagName);
}

export function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
