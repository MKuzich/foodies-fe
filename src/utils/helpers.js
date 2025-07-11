export const enshureEnoughItems = (values, count) => {
  if (!Array.isArray(values)) return null;

  const cloned = [...values];

  if (cloned.length >= count) {
    return cloned;
  }

  if (cloned.length === 0) return null;

  const valuesLength = cloned.length;
  let i = 1;

  while (cloned.length < count) {
    const itemToClone = cloned[valuesLength - i];
    cloned.push({ ...itemToClone, id: cloned.length + i });
    i++;
    if (i > valuesLength) {
      i = 1;
    }
  }

  return cloned;
};

export const smoothScrollLeft = (element, to, duration = 300) => {
  const start = element.scrollLeft;
  const change = to - start;
  const startTime = performance.now();

  const animateScroll = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);

    element.scrollLeft = start + change * ease;

    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  };

  requestAnimationFrame(animateScroll);
};
