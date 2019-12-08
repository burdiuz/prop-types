const { singleValueFactory } = require('@actualwave/closure-value');

const defaultPrintWarning = (text) => {
  let message = `Warning: ${text}`;

  if (typeof console !== 'undefined') {
    console.error(message);
  }
};

const { get: getPrintWarningFn, set: setPrintWarningFn } = singleValueFactory(defaultPrintWarning);

const printWarning = (...args) => getPrintWarningFn()(...args);

module.exports = {
  defaultPrintWarning,
  getPrintWarningFn,
  setPrintWarningFn,
  printWarning,
};
