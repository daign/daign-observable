import { UnicastObservable } from './unicastObservable';

/**
 * Unicast observable implementation that allows for events being emitted from outside of the class.
 */
export class UnicastEventEmitter extends UnicastObservable {
  /**
   * Constructor.
   */
  public constructor() {
    super();
  }

  /**
   * Send an event to notify the observer.
   */
  public emit(): void {
    this.notifyObserver();
  }
}
