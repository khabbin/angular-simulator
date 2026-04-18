import { Component, DestroyRef, EventEmitter, inject, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs';

@Component({
  selector: 'app-users-filter',
  imports: [ReactiveFormsModule],
  templateUrl: './users-filter.component.html',
  styleUrl: './users-filter.component.scss',
})
export class UsersFilterComponent {
  
  @Output() changeFilter = new EventEmitter<string>();
  private destroyRef = inject(DestroyRef);
  
  searchUserControl: FormControl<string | null> = new FormControl('');
  
  ngOnInit() {
    this.searchUserControl.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((value: string | null) => value ? value.trim().toLowerCase() : ''),
      tap((value: string) => this.changeFilter.emit(value)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }
  
}
