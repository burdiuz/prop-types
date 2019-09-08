const { singleValueFactory } = require('@actualwave/closure-value');

const defaultIsEnabled = () => process.env.NODE_ENV !== 'production';

const { get: getIsEnabledFn, set: setIsEnabledFn } = singleValueFactory(defaultIsEnabled);

/*
  const FORCED_PROPTYPES = Symbol.get('prop-types-forced');
*/
const FORCED_PROPTYPES = '@@prop-types-forced';

const isEnabled = (specs) => getIsEnabledFn()() || (specs && specs[FORCED_PROPTYPES]);

const getSpecs = (target) => (typeof target === 'function' ? target.propTypes : target);

const forcePropTypesCheckOn = (target) => {
  const specs = getSpecs(target);

  if (specs) {
    /*
      When Symbols available
      specs[FORCED_PROPTYPES] = true;
      When Symbols not available:
    */
    Object.defineProperty(specs, FORCED_PROPTYPES, {
      value:true,
      configurable: true,
      writable:false,
      enumerable: false,
    });
  }

  return target;
};

const relaxPropTypesCheckOn = (target) => {
  const specs = getSpecs(target);

  if (specs) {
    delete specs[FORCED_PROPTYPES];
  }

  return target;
};

module.exports = {
  getIsEnabledFn,
  setIsEnabledFn,
  isEnabled,
  forcePropTypesCheckOn,
  relaxPropTypesCheckOn,
};
