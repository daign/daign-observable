import { Subject } from 'rxjs';

/**
 * Abstract class that can be subscribed to for changes.
 */
export abstract class Observable {
  // The subject that will forward the notification.
  private subject: Subject<void> = new Subject<void>();

  // Priority actions that are execute before normal observers.
  private priorityActions: ( () => Promise<void> )[] = [];

  /**
   * Constructor.
   */
  protected constructor() {}

  /**
   * Add an observer callback that will be called when changes happen.
   * @param callback - The callback that will be called on changes.
   * @returns A callback to remove the subscription.
   */
  public subscribeToChanges( callback: () => void ): () => void {
    // Subscribe to the subject and call the callback.
    const subscription = this.subject.asObservable().subscribe( (): void => {
      callback();
    } );

    // Return a callback that will remove the subscription when called.
    return (): void => {
      subscription.unsubscribe();
    }
  }

  /**
   * Add a priority action.
   * @param action - The callback to execute for the action.
   */
  public addPriorityAction( action: () => Promise<void> ): void {
    this.priorityActions.push( action );
  }

  /**
   * Notify all observers.
   * @returns Promise to wait for actions to complete.
   */
  protected notifyObservers(): Promise<void> {
    // Wait for the execution of all priority actions first.
    return Promise.all(
      this.priorityActions.map( ( action: () => Promise<void> ): Promise<void> => action() )
    )
      .then( (): void => {
        // Notify all observers by pushing to the subject.
        this.subject.next();
      }
    );
  }

  /**
   * Remove all observers.
   */
  protected clearObservers(): void {
    // Remove all subscriptions from the subject.
    this.subject.complete();

    // Create a new subject for new subscriptions.
    this.subject = new Subject();
  }
}
