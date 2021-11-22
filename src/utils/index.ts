export const checkEmptyObject = (object: {}): boolean => {
  return (
    object &&
    Object.keys(object).length === 0 &&
    Object.getPrototypeOf(object) === Object.prototype
  );
};
