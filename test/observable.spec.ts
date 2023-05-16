import { expect } from 'chai';
import { spy } from 'sinon';

import { Observable } from '../lib';

describe( 'Observable', (): void => {
  class TestClass extends Observable {
    public constructor() {
      super();
    }
  }

  describe( 'subscribeToChanges', (): void => {
    it( 'should add a listener', (): void => {
      // Arrange
      const t = new TestClass();

      // Act
      t.subscribeToChanges( (): void => {} );

      // Assert
      expect( ( t as any ).listeners.length ).to.equal( 1 );
    } );

    it( 'should return a callback which allows removal', (): void => {
      // Arrange
      const t = new TestClass();

      // Act
      const r = t.subscribeToChanges( (): void => {} );
      r();

      // Assert
      expect( ( t as any ).listeners.length ).to.equal( 0 );
    } );

    it( 'should not throw an error when trying to remove a non-existent listener', (): void => {
      // Arrange
      const t = new TestClass();
      const r = t.subscribeToChanges( (): void => {} );
      // Listener is removed unexpectedly
      ( t as any ).listeners = [];

      // Act and assert
      expect( r ).to.not.throw();
    } );
  } );

  describe( 'notifyObservers', (): void => {
    it( 'should call the callback', (): void => {
      // Arrange
      const t = new TestClass();
      const spyCallback = spy();
      t.subscribeToChanges( spyCallback );

      // Act
      ( t as any ).notifyObservers();

      // Assert
      expect( spyCallback.calledOnce ).to.be.true;
    } );
  } );

  describe( 'clearObservers', (): void => {
    it( 'should remove all listeners', (): void => {
      // Arrange
      const t = new TestClass();
      t.subscribeToChanges( (): void => {} );

      // Act
      ( t as any ).clearObservers();

      // Assert
      expect( ( t as any ).listeners.length ).to.equal( 0 );
    } );
  } );
} );
