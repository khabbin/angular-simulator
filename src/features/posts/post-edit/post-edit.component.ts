import { Component, inject, OnDestroy } from '@angular/core';
import { PostService } from '../post.service';
import { DialogService, DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from '../../../app/services/message.service';
import { LoaderService } from '../../../app/services/loader.service';
import { catchError, tap, throwError } from 'rxjs';
import type { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  providers: [DialogService],
  selector: 'app-post-edit',
  imports: [ReactiveFormsModule, ButtonModule, ToastModule, DialogModule, DynamicDialogModule, InputTextModule, FormsModule ],
  templateUrl: './post-edit.component.html',
  styleUrl: './post-edit.component.scss',
})
export class PostEditComponent implements OnDestroy {
  dialogService: DialogService = inject(DialogService);
  messageService: MessageService = inject(MessageService);
  loaderService: LoaderService = inject(LoaderService);
  postService: PostService = inject(PostService);
  private dynamicDialogConfig: DynamicDialogConfig = inject(DynamicDialogConfig);
  private ref: DynamicDialogRef = inject(DynamicDialogRef);
  private fb: FormBuilder = inject(FormBuilder);
  
  postId: number = this.dynamicDialogConfig.data!.id;
  
  postEditForm: FormGroup = this.fb.nonNullable.group({
    title: ['', [Validators.required]],
    tags: ['', [Validators.required]],
    views: [null, [Validators.required]],
  })
  
  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
  }
  
  onPostEdit(): void {
    const tags: string[] = this.postEditForm.get('tags')!.value
      .split(',').map((str: string) => str.trim())
      .filter((str: string) => str !== '');
    if (this.postEditForm.valid) {
      this.loaderService.showSpinner();
      this.postService.editPost(this.postId, { ...this.postEditForm.value, tags: tags }).pipe(
        tap(() => {
          this.loaderService.hideSpinner();
          this.closeModal();
          this.messageService.showInfo('Пост изменён');
        }),
        catchError((error: HttpErrorResponse) => {
          this.messageService.showError(`Ошибка: ${ error }`);
          return throwError(() => error);
        })
      ).subscribe();
    } else {
      this.messageService.showError('Введите корректные данные');
    }
  }
  
  closeModal(): void {
    this.ref?.close();
  }
}
