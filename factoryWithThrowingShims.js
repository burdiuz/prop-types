/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var ReactPropTypesSecret = require('./lib/ReactPropTypesSecret');

const {
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
} = require('./propTypeRecords');

function emptyFunction() {}
function emptyFunctionWithReset() {}
emptyFunctionWithReset.resetWarningCache = emptyFunction;

module.exports = function() {
  const createShim = (type, metaExtender) => {
    function shim(props, propName, componentName, location, propFullName, secret) {
      if (secret === ReactPropTypesSecret) {
        // It is still safe when called from React.
        return;
      }
      var err = new Error(
        'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
          'Use PropTypes.checkPropTypes() to call them. ' +
          'Read more at http://fb.me/use-check-prop-types',
      );
      err.name = 'Invariant Violation';
      throw err;
    }

    shim.isRequired = shim.bind(null);

    alterChainableTypeCheckerWithMeta(shim, type, metaExtender);

    return shim;
  };

  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: createShim(...primitiveTypeCheckerArgs('array')),
    bool: createShim(...primitiveTypeCheckerArgs('boolean')),
    func: createShim(...primitiveTypeCheckerArgs('function')),
    number: createShim(...primitiveTypeCheckerArgs('number')),
    object: createShim(...primitiveTypeCheckerArgs('object')),
    string: createShim(...primitiveTypeCheckerArgs('string')),
    symbol: createShim(...primitiveTypeCheckerArgs('symbol')),

    any: createShim(...anyTypeCheckerArgs()),
    arrayOf: (arg) => createShim(...arrayOfTypeCheckerArgs(arg)),
    element: createShim(...elementTypeCheckerArgs()),
    elementType: createShim(...elementTypeTypeCheckerArgs()),
    instanceOf: (arg) => createShim(...instanceOfTypeCheckerArgs(arg)),
    node: createShim(...nodeTypeCheckerArgs()),
    objectOf: (arg) => createShim(...objectOfTypeCheckerArgs(arg)),
    oneOf: (arg) => createShim(...oneOfTypeCheckerArgs(arg)),
    oneOfType: (arg) => createShim(...oneOfTypeTypeCheckerArgs(arg)),
    shape: (arg) => createShim(...shapeTypeCheckerArgs(arg)),
    exact: (arg) => createShim(...exactTypeCheckerArgs(arg)),

    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction,
    gatherMetaFromPropTypesMap,
  };

  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};
