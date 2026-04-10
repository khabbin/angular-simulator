import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  
  private loadingCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  isLoading$: Observable<boolean> = this.loadingCountSubject.asObservable()
  .pipe(
    map((count: number) => count > 0)
  );
  
  showSpinner(): void {
    const counter: number = this.loadingCountSubject.getValue();
    this.loadingCountSubject.next(counter + 1);
    document.body.style.overflow = 'hidden';
  }
  
  hideSpinner(): void {
    const counter: number = this.loadingCountSubject.getValue();
    this.loadingCountSubject.next(Math.max(0, counter - 1));
    document.body.style.overflow = '';
  }
  
}
