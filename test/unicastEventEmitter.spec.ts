import { expect } from 'chai';
import { spy } from 'sinon';

import { UnicastEventEmitter } from '../lib';

describe( 'UnicastEventEmitter', (): void => {
  describe( 'emit', (): void => {
    it( 'should call the callback', (): void => {
      // Arrange
      const e = new UnicastEventEmitter();
      const spyCallback = spy();
      e.setObserver( spyCallback );

      // Act
      e.emit();

      // Assert
      expect( spyCallback.calledOnce ).to.be.true;
    } );
  } );
} );
