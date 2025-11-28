export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const compareWrapper = (fieldName: string, isAsc = true): ((a: any, b: any) => number) => {
  const innerCompare = (a: any, b: any): number => {
  const biggerValue = isAsc ? 1 : -1;
  const smallerValue = 0 - biggerValue;

  if (a && b && (typeof a[fieldName] === 'number' || typeof a[fieldName] === 'boolean')) {
    if (a[fieldName] > b[fieldName]) {
      return biggerValue;
    } else if (a[fieldName] < b[fieldName]) {
      return smallerValue
    }

    return 0;
  }

  const x = a && typeof a[fieldName] !== 'undefined' ? (a[fieldName] + '').toLowerCase() : '';
  const y = b && typeof b[fieldName] !== 'undefined' ? (b[fieldName] + '').toLowerCase() : '';

  if (x > y) {
    return biggerValue;
  } else if (x < y) {
    return smallerValue;
  }

  return 0;
 };

 return innerCompare;
}
