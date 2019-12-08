'use strict';

const TYPES = Object.freeze({
  array: 'array',
  bool: 'boolean',
  func: 'function',
  number: 'number',
  object: 'object',
  string: 'string',
  symbol: 'symbol',
  any: 'any',
  arrayOf: 'arrayOf',
  element: 'element',
  elementType: 'elementType',
  instanceOf: 'instanceOf',
  oneOf: 'oneOf',
  objectOf: 'objectOf',
  oneOfType: 'oneOfType',
  node: 'node',
  shape: 'shape',
  unknown: 'unknown',
});

const createMeta = (type, required, metaExtender = (meta) => meta) =>
  metaExtender({ type, required, primitive: false });

const alterChainableTypeCheckerWithMeta = (chainedCheckType, type, metaExtender) => {
  chainedCheckType.meta = createMeta(type, false, metaExtender);
  chainedCheckType.isRequired.meta = createMeta(type, true, metaExtender);
};

const primitiveTypeCheckerArgs = (expectedType) => [
  expectedType,
  (meta) => ({
    ...meta,
    primitive: true,
  }),
];

const anyTypeCheckerArgs = () => [TYPES.any];

const arrayOfTypeCheckerArgs = (typeChecker) => [
  TYPES.arrayOf,
  (meta) => ({
    ...meta,
    value: typeChecker.meta,
  }),
];

const elementTypeCheckerArgs = () => [TYPES.element];

const elementTypeTypeCheckerArgs = () => [TYPES.elementType];

const instanceOfTypeCheckerArgs = (expectedClass) => [
  TYPES.instanceOf,
  (meta) => ({
    ...meta,
    value: expectedClass,
  }),
];

const oneOfTypeCheckerArgs = (expectedValues) => [
  TYPES.oneOf,
  (meta) => ({
    ...meta,
    value: expectedValues,
  }),
];

const objectOfTypeCheckerArgs = (typeChecker) => [
  TYPES.objectOf,
  (meta) => ({
    ...meta,
    value: typeChecker.meta,
  }),
];

const oneOfTypeTypeCheckerArgs = (arrayOfTypeCheckers) => [
  TYPES.oneOfType,
  (meta) => ({
    ...meta,
    value: arrayOfTypeCheckers.map(({ meta }) => meta),
  }),
];

const nodeTypeCheckerArgs = () => [TYPES.node];

const shapeTypeCheckerArgs = (shapeTypes) => [
  TYPES.shape,
  (meta) => ({
    ...meta,
    value: Object.keys(shapeTypes).reduce((result, key) => ({ ...result, [key]: shapeTypes[key] }), {}),
  }),
];

const exactTypeCheckerArgs = shapeTypeCheckerArgs;

const gatherMetaFromPropTypesMap = (propTypes, ignoreUnknown = true) => {
  if (!propTypes) {
    return null;
  }

  return Object.keys(propTypes).reduce((res, key) => {
    const {
      [key]: { meta },
    } = propTypes;

    if (!meta && ignoreUnknown) {
      return res;
    }

    return { ...res, [key]: meta || { type: TYPES.unknown, required: false, primitive: false } };
  }, {});
};

module.exports = {
  alterChainableTypeCheckerWithMeta,
  primitiveTypeCheckerArgs,
  anyTypeCheckerArgs,
  arrayOfTypeCheckerArgs,
  elementTypeCheckerArgs,
  elementTypeTypeCheckerArgs,
  instanceOfTypeCheckerArgs,
  oneOfTypeCheckerArgs,
  objectOfTypeCheckerArgs,
  oneOfTypeTypeCheckerArgs,
  nodeTypeCheckerArgs,
  shapeTypeCheckerArgs,
  exactTypeCheckerArgs,
  gatherMetaFromPropTypesMap,
  TYPES,
};
