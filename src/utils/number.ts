export const isNumber = (number?: string) => {
  if (!number) return false;

  return !isNaN(Number(parseInt(number)));
};
