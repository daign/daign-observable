import { expect } from 'chai';
import { spy } from 'sinon';

import { UnicastObservable } from '../lib';

describe( 'UnicastObservable', (): void => {
  class TestClass extends UnicastObservable {
    public constructor() {
      super();
    }
  }

  describe( 'setObserver', (): void => {
    it( 'should set the listener', (): void => {
      // Arrange
      const t = new TestClass();

      // Act
      t.setObserver( (): void => {} );

      // Assert
      expect( ( t as any ).listener ).to.not.be.null;
    } );
  } );

  describe( 'notifyObserver', (): void => {
    it( 'should call the callback', (): void => {
      // Arrange
      const t = new TestClass();
      const spyCallback = spy();
      t.setObserver( spyCallback );

      // Act
      ( t as any ).notifyObserver();

      // Assert
      expect( spyCallback.calledOnce ).to.be.true;
    } );

    it( 'should not throw error when there is no observer', (): void => {
      // Arrange
      const t = new TestClass();

      // Act
      const goodFn = (): void => {
        ( t as any ).notifyObserver();
      };

      // Assert
      expect( goodFn ).to.not.throw();
    } );
  } );

  describe( 'clearObserver', (): void => {
    it( 'should set listener to null', (): void => {
      // Arrange
      const t = new TestClass();
      t.setObserver( (): void => {} );

      // Act
      ( t as any ).clearObserver();

      // Assert
      expect( ( t as any ).listener ).to.be.null;
    } );

    it( 'should not call the callback anymore afterwards', (): void => {
      // Arrange
      const t = new TestClass();
      const spyCallback = spy();
      t.setObserver( spyCallback );

      // Act
      ( t as any ).clearObserver();
      ( t as any ).notifyObserver();

      // Assert
      expect( spyCallback.notCalled ).to.be.true;
    } );
  } );
} );
