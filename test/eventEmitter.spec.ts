import { expect } from 'chai';
import { spy } from 'sinon';

import { EventEmitter } from '../lib';

describe( 'EventEmitter', (): void => {
  describe( 'emit', (): void => {
    it( 'should call the callback', (): void => {
      // Arrange
      const e = new EventEmitter();
      const spyCallback = spy();
      e.subscribeToChanges( spyCallback );

      // Act
      e.emit();

      // Assert
      expect( spyCallback.calledOnce ).to.be.true;
    } );
  } );
} );
