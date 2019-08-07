# prop-types

Runtime type checking for React props and similar objects.

You can use prop-types to document the intended types of properties passed to
components. React (and potentially other libraries—see the checkPropTypes()
reference below) will check props passed to your components against those
definitions, and warn in development if they don’t match.

## Information about this fork
This fork was created to extend PropTypes in a such way that PropTypes can 
generate a map object of type specs. These specs are saved as `meta` property, 
so you can grab them like this
```javascript
PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
]).isRequired.meta
```
Which will return object
```json
{
  "type": "oneOfType",
  "required": true,
  "primitive": false,
  "value": [
    {
      "type": "string",
      "required": false,
      "primitive": true
    },
    {
      "type": "number",
      "required": false,
      "primitive": true
    }
  ]
}
```
Or apply to React component PropTypes like this
```javascript
PropTypes.gatherMetaFromPropTypesMap(Image.propTypes)
```
To retrieve meta data from all PropType definitions for the component.

> While PropTypes silenced in production, meta part works exactly same way in development and production modes.

## Installation
All the changes are in `meta` branch.
NPM
```shell
npm install --save github:burdiuz/prop-types#meta
```

Yarn
```shell
yarn add github:burdiuz/prop-types#meta
```

## Importing

```js
import PropTypes from 'prop-types'; // ES6
var PropTypes = require('prop-types'); // ES5 with npm
```

## Usage

PropTypes was originally exposed as part of the React core module, and is
commonly used with React components.
Here is an example of using PropTypes with a React component, which also
documents the different validators provided:

```js
import React from 'react';
import PropTypes from 'prop-types';

class MyComponent extends React.Component {
  render() {
    // ... do things with the props
  }
}

MyComponent.propTypes = {
  // You can declare that a prop is a specific JS primitive. By default, these
  // are all optional.
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,

  // Anything that can be rendered: numbers, strings, elements or an array
  // (or fragment) containing these types.
  // see https://reactjs.org/docs/rendering-elements.html for more info
  optionalNode: PropTypes.node,

  // A React element (ie. <MyComponent />).
  optionalElement: PropTypes.element,

  // A React element type (ie. MyComponent).
  optionalElementType: PropTypes.elementType,

  // You can also declare that a prop is an instance of a class. This uses
  // JS's instanceof operator.
  optionalMessage: PropTypes.instanceOf(Message),

  // You can ensure that your prop is limited to specific values by treating
  // it as an enum.
  optionalEnum: PropTypes.oneOf(['News', 'Photos']),

  // An object that could be one of many types
  optionalUnion: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Message)
  ]),

  // An array of a certain type
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

  // An object with property values of a certain type
  optionalObjectOf: PropTypes.objectOf(PropTypes.number),

  // You can chain any of the above with `isRequired` to make sure a warning
  // is shown if the prop isn't provided.

  // An object taking on a particular shape
  optionalObjectWithShape: PropTypes.shape({
    optionalProperty: PropTypes.string,
    requiredProperty: PropTypes.number.isRequired
  }),

  // An object with warnings on extra properties
  optionalObjectWithStrictShape: PropTypes.exact({
    optionalProperty: PropTypes.string,
    requiredProperty: PropTypes.number.isRequired
  }),

  requiredFunc: PropTypes.func.isRequired,

  // A value of any data type
  requiredAny: PropTypes.any.isRequired,

  // You can also specify a custom validator. It should return an Error
  // object if the validation fails. Don't `console.warn` or throw, as this
  // won't work inside `oneOfType`.
  customProp: function(props, propName, componentName) {
    if (!/matchme/.test(props[propName])) {
      return new Error(
        'Invalid prop `' + propName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  },

  // You can also supply a custom validator to `arrayOf` and `objectOf`.
  // It should return an Error object if the validation fails. The validator
  // will be called for each key in the array or object. The first two
  // arguments of the validator are the array or object itself, and the
  // current item's key.
  customArrayProp: PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
    if (!/matchme/.test(propValue[key])) {
      return new Error(
        'Invalid prop `' + propFullName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  })
};
```

Refer to the [React documentation](https://facebook.github.io/react/docs/typechecking-with-proptypes.html) for more information.

## PropTypes.checkPropTypes

React will automatically check the propTypes you set on the component, but if
you are using PropTypes without React then you may want to manually call
`PropTypes.checkPropTypes`, like so:

```js
const myPropTypes = {
  name: PropTypes.string,
  age: PropTypes.number,
  // ... define your prop validations
};

const props = {
  name: 'hello', // is valid
  age: 'world', // not valid
};

// Let's say your component is called 'MyComponent'

// Works with standalone PropTypes
PropTypes.checkPropTypes(myPropTypes, props, 'age', 'MyComponent');
// This will warn as follows:
// Warning: Failed prop type: Invalid prop `age` of type `string` supplied to
// `MyComponent`, expected `number`.
```

## PropTypes.resetWarningCache()

`PropTypes.checkPropTypes(...)` only `console.error`s a given message once. To reset the error warning cache in tests, call `PropTypes.resetWarningCache()`

### License

prop-types is [MIT licensed](./LICENSE).
