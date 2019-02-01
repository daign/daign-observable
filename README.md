# daign-observable

[![NPM package][npm]][npm-url]

Simple implementation of observable pattern in Typescript

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

#### Build

    npm run build

#### Run lint analysis

    npm run lint

#### Run unit tests with code coverage

    npm run test

[npm]: https://img.shields.io/npm/v/@daign/observable.svg
[npm-url]: https://www.npmjs.com/package/@daign/observable
