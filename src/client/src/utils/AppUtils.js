export function parseLabel(label) {
  let parsedLabel = "";
  for (let i = 0; i < label.length; i++) {
    if (i === 0) {
      parsedLabel += label.charAt(i).toUpperCase();
    } else if (label.charAt(i) === "_" && i < label.length - 1) {
      parsedLabel += " " + label.charAt(i + 1).toUpperCase();
      i++;
    } else {
      parsedLabel += label.charAt(i);
    }
  }
  return parsedLabel;
}

export function debounce(func) {
  let timer;
  return function () {
    let context = this,
      args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(context, args);
    }, 300);
  };
}
