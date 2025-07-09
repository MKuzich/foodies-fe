export const enshureEnoughItems = (values, count) => {
  if (Array.isArray(values) && values.length >= count) {
    return values;
  }
  const valuesLength = values.length;
  let i = 1;
  while (values.length < count) {
    values.push({ ...values[valuesLength - i], id: values.length + i });
    i++;
    if (i > valuesLength) {
      i = 1;
    }
  }
  return values;
};
