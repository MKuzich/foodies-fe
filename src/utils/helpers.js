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
