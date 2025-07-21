export const autoResize = (ref, forceReset = false) => {
  const el = ref.current;

  if (!el) return;

  if (forceReset) {
    el.style.height = "auto";
    return;
  }

  const height = calculateTextAreaHeight(el);
  el.style.height = `${height}px`;
  el.style.overflow = "hidden";
  return;
};

const calculateTextAreaHeight = (el) => {
  const computedStyle = window.getComputedStyle(el);
  const clone = document.createElement("textarea");
  clone.style.position = "absolute";
  clone.style.visibility = "hidden";
  clone.style.zIndex = "-1";
  clone.style.height = "auto";
  clone.style.whiteSpace = "pre-wrap";
  clone.style.wordBreak = "break-word";
  clone.style.overflow = "hidden";
  const propertiesToCopy = [
    "width",
    "fontSize",
    "fontFamily",
    "fontWeight",
    "fontStyle",
    "lineHeight",
    "letterSpacing",
    "padding",
    "border",
    "boxSizing",
  ];
  propertiesToCopy.forEach((prop) => {
    clone.style[prop] = computedStyle[prop];
  });

  clone.value = el.value;

  clone.style.width = el.offsetWidth + "px";

  document.body.appendChild(clone);
  const height = clone.scrollHeight;

  document.body.removeChild(clone);

  return height;
};
