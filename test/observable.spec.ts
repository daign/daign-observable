import { expect } from 'chai';
import { spy } from 'sinon';

import { Observable } from '../lib/observable';

describe( 'Observable', (): void => {
  class TestClass extends Observable {
    public constructor() {
      super();
    }
  }

  describe( 'subscribeToChanges', (): void => {
    it( 'should add the callback to be called on changes', (): void => {
      // Arrange
      const test = new TestClass();
      const callBackSyp = spy();

      // Act
      test.subscribeToChanges( callBackSyp );
      ( test as any ).notifyObservers();

      // Assert
      expect( callBackSyp.calledOnce ).to.be.true;
    } );

    it( 'should return a callback which allows removal', (): void => {
      // Arrange
      const test = new TestClass();
      const callBackSyp = spy();

      // Act
      const remover = test.subscribeToChanges( callBackSyp );
      remover();
      ( test as any ).notifyObservers();

      // Assert
      expect( callBackSyp.notCalled ).to.be.true;
    } );

    it( 'should not throw an error when trying to remove a removed subscription', (): void => {
      // Arrange
      const test = new TestClass();
      const remover = test.subscribeToChanges( (): void => {} );
      // Subscription is removed.
      ( test as any ).clearObservers();

      // Act and assert
      expect( remover ).to.not.throw();
    } );
  } );

  describe( 'notifyObservers', (): void => {
    it( 'should call the callback', (): void => {
      // Arrange
      const test = new TestClass();
      const callBackSyp = spy();
      test.subscribeToChanges( callBackSyp );

      // Act
      ( test as any ).notifyObservers();

      // Assert
      expect( callBackSyp.calledOnce ).to.be.true;
    } );
  } );

  describe( 'clearObservers', (): void => {
    it( 'should not call callback anymore after observers were cleared', (): void => {
      // Arrange
      const test = new TestClass();
      const callBackSyp = spy();
      test.subscribeToChanges( callBackSyp );

      // Act
      ( test as any ).clearObservers();
      ( test as any ).notifyObservers();

      // Assert
      expect( callBackSyp.notCalled ).to.be.true;
    } );

    it( 'should allow new subscriptions after observers were cleared', (): void => {
      // Arrange
      const test = new TestClass();
      const callBackSyp1 = spy();
      const callBackSyp2 = spy();
      test.subscribeToChanges( callBackSyp1 );

      // Act
      ( test as any ).clearObservers();
      test.subscribeToChanges( callBackSyp2 );
      ( test as any ).notifyObservers();

      // Assert
      expect( callBackSyp1.notCalled ).to.be.true;
      expect( callBackSyp2.calledOnce ).to.be.true;
    } );
  } );
} );
