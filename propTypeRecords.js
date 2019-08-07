'use strict';

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

const anyTypeCheckerArgs = () => ['any'];

const arrayOfTypeCheckerArgs = (typeChecker) => [
  'arrayOf',
  (meta) => ({
    ...meta,
    value: typeChecker.meta,
  }),
];

const elementTypeCheckerArgs = () => ['element'];

const elementTypeTypeCheckerArgs = () => ['elementType'];

const instanceOfTypeCheckerArgs = (expectedClass) => [
  'instanceOf',
  (meta) => ({
    ...meta,
    value: expectedClass,
  }),
];

const oneOfTypeCheckerArgs = (expectedValues) => [
  'enum',
  (meta) => ({
    ...meta,
    value: expectedValues,
  }),
];

const objectOfTypeCheckerArgs = (typeChecker) => [
  'objectOf',
  (meta) => ({
    ...meta,
    value: typeChecker.meta,
  }),
];

const oneOfTypeTypeCheckerArgs = (arrayOfTypeCheckers) => [
  'oneOfType',
  (meta) => ({
    ...meta,
    value: arrayOfTypeCheckers.map(({ meta }) => meta),
  }),
];

const nodeTypeCheckerArgs = () => ['node'];

const shapeTypeCheckerArgs = (shapeTypes) => [
  'shape',
  (meta) => ({
    ...meta,
    value: Object.keys(shapeTypes).reduce(
      (result, key) => ({ ...result, [key]: shapeTypes[key] }),
      {},
    ),
  }),
];

const exactTypeCheckerArgs = shapeTypeCheckerArgs;

const gatherMetaFromPropTypesMap = (propTypes) => {
  if (!propTypes) {
    return null;
  }

  return Object.keys(propTypes).reduce((res, key) => ({ ...res, [key]: propTypes[key].meta }), {});
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
};
