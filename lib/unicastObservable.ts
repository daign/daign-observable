/**
 * Observable that can only have a single subscriber.
 */
export abstract class UnicastObservable {
  // Callback of the observer.
  private listener: ( () => void ) | null = null;

  /**
   * Constructor.
   */
  public constructor() {}

  /**
   * Set the one observer by passing a callback.
   * @param callback - Callback of the observer.
   */
  public setObserver( callback: () => void ): void {
    this.listener = callback;
  }

  /**
   * Notify the observer by calling the callback.
   */
  protected notifyObserver(): void {
    if ( this.listener ) {
      this.listener();
    }
  }

  /**
   * Remove the observer.
   */
  public clearObserver(): void {
    this.listener = null;
  }
}
