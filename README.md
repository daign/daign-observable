# daign-observable

[![CI][ci-icon]][ci-url]
[![Coverage][coveralls-icon]][coveralls-url]
[![NPM package][npm-icon]][npm-url]

#### Simple implementation of observable pattern in Typescript.

## Installation

```sh
npm install @daign/observable --save
```

## Usage

```typescript
import {Observable} from '@daign/observable';

// Inherit from Observable
class MyClass extends Observable {
  private _x: number;

  public get x(): number {
    return this._x;
  }

  public set x( value: number ) {
    this._x = value;

    // Call notifyObservers to signal a change to the observers
    this.notifyObservers();
  }

  constructor() {
    super();
    this._x = 0;
  }
}

const myClass = new MyClass();

// Register a callback to be called on changes
const removeListener = myClass.subscribeToChanges( () => {
  console.log( myClass.x );
} );
myClass.x = 1;

// Remove the callback registration from the observable
removeListener();
```

## Scripts

```bash
# Build
npm run build

# Run lint analysis
npm run lint

# Run unit tests with code coverage
npm run test

# Get a full lcov report
npm run coverage
```

[ci-icon]: https://github.com/daign/daign-observable/workflows/CI/badge.svg
[ci-url]: https://github.com/daign/daign-observable/actions
[coveralls-icon]: https://coveralls.io/repos/github/daign/daign-observable/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/daign/daign-observable?branch=master
[npm-icon]: https://img.shields.io/npm/v/@daign/observable.svg
[npm-url]: https://www.npmjs.com/package/@daign/observable
