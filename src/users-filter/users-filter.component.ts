import {
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Output,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs';

@Component({
  selector: 'app-users-filter',
  imports: [ReactiveFormsModule],
  templateUrl: './users-filter.component.html',
  styleUrl: './users-filter.component.scss',
})
export class UsersFilterComponent implements OnInit {
  
  @Output() changeFilter: EventEmitter<string> = new EventEmitter<string>();
  private destroyRef: DestroyRef = inject(DestroyRef);

  filterUserControl = new FormControl<string | null>('');

  ngOnInit() {
    this.filterUserControl.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        map((value: string | null) =>
          value ? value.trim().toLowerCase() : ''
        ),
        tap((value: string) => this.changeFilter.emit(value)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }
  
}
