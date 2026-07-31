import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IPost } from '../IPost';
import { CommonModule } from '@angular/common';
import { PostService } from '../post.service';
import { catchError, tap, throwError } from 'rxjs';
import { MessageService } from '../../../app/services/message.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-post-create',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss',
})
export class PostCreateComponent {
  private fb: FormBuilder = inject(FormBuilder);
  private postService: PostService = inject(PostService);
  private router: Router = inject(Router);
  private messageService: MessageService = inject(MessageService);

  postForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
    body: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(1000)]],
    userId: ['', [Validators.required, Validators.min(1)]],
    tags: [[], Validators.required]
  });
  
  onSubmit(): void {
    if (this.postForm.valid) {
      
      const tagsArray: string[] = this.postForm.value.tags
        .split(',')
        .map((tag: string) => tag.trim())
        .filter((tag: string) => tag !== '');
      
      const post: IPost = {
        ...this.postForm.getRawValue() as IPost,
        tags: tagsArray,
        id: Date.now(),
        reactions: {
          likes: 0,
          dislikes: 0
        },
        views: 0
      }
      this.postService.createPost(post).pipe(
        tap(() => {
          this.router.navigate([`/posts`]);
          this.messageService.showInfo('Пост создан');
        }),
        catchError((error: HttpErrorResponse) => {
          this.messageService.showError(`Ошибка сети: ${ error }`)
          return throwError(() => error);
        })
      ).subscribe()
    } else {
      this.messageService.showError(`форма не валидна`)
    }
  }
}
