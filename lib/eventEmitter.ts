import { Observable } from './observable';

/**
 * Observable implementation that allows for events being emitted from outside of the class.
 */
export class EventEmitter extends Observable {
  /**
   * Constructor.
   */
  public constructor() {
    super();
  }

  /**
   * Send an event to notify all observers.
   */
  public emit(): void {
    this.notifyObservers();
  }
}
