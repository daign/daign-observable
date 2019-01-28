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

class MyClass extends Observable {
  private _x: number;

  public get x(): number {
    return this._x;
  }

  public set x( value: number ) {
    this._x = value;
    this.notifyObservers();
  }

  constructor() {
    super();
    this._x = 0;
  }
}

const myClass = new MyClass();
const removeListener = myClass.subscribeToChanges( () => {
  console.log( myClass.x );
} );
myClass.x = 1;

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
