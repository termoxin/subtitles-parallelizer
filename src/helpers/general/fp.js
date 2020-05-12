export const compose = (...fns) => (...args) =>
  fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0];
