import { Subject, Observable as RxObservable, flatMap, forkJoin, of } from 'rxjs';

/**
 * Abstract class that can be subscribed to for changes.
 */
export abstract class Observable {
  // The subject that will forward the notification.
  private subject: Subject<void> = new Subject<void>();

  // Priority actions that are execute before normal observers.
  private priorityActions: RxObservable<null>[] = [];

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
   * @param action - The observable to execute.
   */
  public addPriorityAction( action: RxObservable<null> ): void {
    this.priorityActions.push( action );
  }

  /**
   * Notify all observers.
   */
  protected notifyObservers(): void {
    // Wait for the execution of all priority actions first.
    let priorityObservable = of( null );
    if ( this.priorityActions.length > 0 ) {
      priorityObservable = forkJoin( this.priorityActions )
        .pipe( flatMap( (): RxObservable<null> => {
          return of( null );
        } ) );
    }

    priorityObservable.subscribe( {
      next: (): void => {
        this.subject.next();
      }
    } );
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
