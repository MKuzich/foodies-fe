export const compareTwoObjectsShallow = (obj1, obj2) => {
  if (obj1 === obj2) return true;
  
  if (obj1 == null || obj2 == null) return false;
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') return false;
  
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  
  if (keys1.length !== keys2.length) return false;
  
  return keys1.every(key => {
    const val1 = obj1[key];
    const val2 = obj2[key];
    
    // If both values are numbers or strings with numbers, compare as numbers
    if (typeof val1 === 'number' && typeof val2 === 'string') {
      return val1.toString() === val2;
    }
    if (typeof val1 === 'string' && typeof val2 === 'number') {
      return val1 === val2.toString();
    }
    
    // For other cases — regular comparison
    return val1 === val2;
  });
};
