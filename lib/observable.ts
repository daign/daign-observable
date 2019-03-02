/**
 * Basic implementation of observable pattern.
 */
export abstract class Observable {
  // Array of callbacks from the observers
  private listeners: Array<() => void> = [];

  /**
   * Constructor
   */
  public constructor() {}

  /**
   * Add an observer by passing a callback
   * @param callback Callback of the observer
   * @returns A callback to remove the observer
   */
  public subscribeToChanges( callback: () => void ): () => void {
    this.listeners.push( callback );

    // Return callback that removes the listener
    return (): void => {
      const i = this.listeners.indexOf( callback );
      if ( i > -1 ) {
        this.listeners.splice( i, 1 );
      }
    };
  }

  /**
   * Notify all observers by calling their callbacks
   */
  protected notifyObservers(): void {
    this.listeners.forEach( ( callback: () => void ): void => {
      callback();
    } );
  }

  /**
   * Remove all observers
   */
  protected clearObservers(): void {
    this.listeners = [];
  }
}
