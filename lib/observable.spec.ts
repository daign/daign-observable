import {expect} from 'chai';
import * as sinon from 'sinon';

import {Observable} from './observable';

describe( 'Observable', () => {
  class TestClass extends Observable {
    constructor() {
      super();
    }
  }

  describe( 'subscribeToChanges', () => {
    it( 'should add a listener', () => {
      // arrange
      const t = new TestClass();

      // act
      t.subscribeToChanges( () => {} );

      // assert
      expect( ( t as any ).listeners.length ).to.equal( 1 );
    } );

    it( 'should return a callback which allows removal', () => {
      // arrange
      const t = new TestClass();

      // act
      const r = t.subscribeToChanges( () => {} );
      r();

      // assert
      expect( ( t as any ).listeners.length ).to.equal( 0 );
    } );

    it( 'should not throw an error when trying to remove a non-existent listener', () => {
      // arrange
      const t = new TestClass();
      const r = t.subscribeToChanges( () => {} );
      // listener is removed unexpectedly
      ( t as any ).listeners = [];

      // act and assert
      expect( r ).to.not.throw();
    } );
  } );

  describe( 'notifyObservers', () => {
    it( 'should call the callback', () => {
      // arrange
      const t = new TestClass();
      const spy = sinon.spy();
      t.subscribeToChanges( spy );

      // act
      ( t as any ).notifyObservers();

      // assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'clearObservers', () => {
    it( 'should remove all listeners', () => {
      // arrange
      const t = new TestClass();
      t.subscribeToChanges( () => {} );

      // act
      ( t as any ).clearObservers();

      // assert
      expect( ( t as any ).listeners.length ).to.equal( 0 );
    } );
  } );
} );
