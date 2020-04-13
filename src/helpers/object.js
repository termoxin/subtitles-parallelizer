export const keyBy = (arr, key) =>
  arr.reduce((acc, val) => {
    const accCopy = { ...acc };

    accCopy[val[key]] = val;

    return accCopy;
  }, {});
