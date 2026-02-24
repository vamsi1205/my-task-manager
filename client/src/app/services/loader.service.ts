import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private pendingRequests = 0;
  private loadingSubject = new BehaviorSubject<boolean>(false);

  loading$ = this.loadingSubject.asObservable();

  show() {
    this.pendingRequests++;
    if (this.pendingRequests === 1) {
      this.loadingSubject.next(true);
    }
  }

  hide() {
    if (this.pendingRequests > 0) {
      this.pendingRequests--;
    }

    if (this.pendingRequests === 0) {
      this.loadingSubject.next(false);
    }
  }
}
