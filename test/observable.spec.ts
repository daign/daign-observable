import { expect } from 'chai';
import * as sinon from 'sinon';

import { Observable } from '../lib/observable';

describe( 'Observable', () => {
  class TestClass extends Observable {
    public constructor() {
      super();
    }
  }

  describe( 'subscribeToChanges', () => {
    it( 'should add a listener', () => {
      // Arrange
      const t = new TestClass();

      // Act
      t.subscribeToChanges( () => {} );

      // Assert
      expect( ( t as any ).listeners.length ).to.equal( 1 );
    } );

    it( 'should return a callback which allows removal', () => {
      // Arrange
      const t = new TestClass();

      // Act
      const r = t.subscribeToChanges( () => {} );
      r();

      // Assert
      expect( ( t as any ).listeners.length ).to.equal( 0 );
    } );

    it( 'should not throw an error when trying to remove a non-existent listener', () => {
      // Arrange
      const t = new TestClass();
      const r = t.subscribeToChanges( () => {} );
      // Listener is removed unexpectedly
      ( t as any ).listeners = [];

      // Act and assert
      expect( r ).to.not.throw();
    } );
  } );

  describe( 'notifyObservers', () => {
    it( 'should call the callback', () => {
      // Arrange
      const t = new TestClass();
      const spy = sinon.spy();
      t.subscribeToChanges( spy );

      // Act
      ( t as any ).notifyObservers();

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'clearObservers', () => {
    it( 'should remove all listeners', () => {
      // Arrange
      const t = new TestClass();
      t.subscribeToChanges( () => {} );

      // Act
      ( t as any ).clearObservers();

      // Assert
      expect( ( t as any ).listeners.length ).to.equal( 0 );
    } );
  } );
} );
