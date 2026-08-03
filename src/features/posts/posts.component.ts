import { Component, inject, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { IPost } from './IPost';
import { SkeletonModule } from 'primeng/skeleton';
import { PostService } from './post.service';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ContextMenuModule } from 'primeng/contextmenu';
import { MenuItem } from 'primeng/api';
import { RouterLink } from '@angular/router';
import { TableLazyLoadEvent } from 'primeng/table';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PostEditComponent } from './post-edit/post-edit.component';
import { MessageService } from '../../app/services/message.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LoaderService } from '../../app/services/loader.service';

@Component({
  providers: [DialogService],
  selector: 'app-posts',
  imports: [
    TableModule,
    SkeletonModule,
    AsyncPipe,
    ContextMenuModule,
    RouterLink,
    DynamicDialogModule
  ],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnInit {
  
  dialogService: DialogService = inject(DialogService);
  menuItems!: MenuItem[];
  postService: PostService = inject(PostService);
  messageService: MessageService = inject(MessageService);
  private ref: DynamicDialogRef | null = null;
  private isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();
  posts$: Observable<IPost[]> = this.postService.posts$;
  loaderService: LoaderService = inject(LoaderService);
  totalRecords$: Observable<number> = this.postService.totalRecords$;
  
  selectedPost: IPost | null = null;
  
  rows: number = 10;
  skip: number = 0;
  
  ngOnInit(): void {
    this.menuItems = [
      { label: 'View', command: (): void => this.redirectToDetailPage(this.selectedPost!) },
      { label: 'Edit', command: (): void => this.showModal() },
      { label: 'Delete', command: (): void => this.onDelete(this.selectedPost!) }
    ];
  }
  
  redirectToDetailPage(post: IPost): void {
    this.messageService.showInfo('Переход к посту');
    this.postService.goToDetail(post);
  }
  
  loadPosts(event: TableLazyLoadEvent): void {
    this.skip = event.first ?? 0;
    this.rows = event.rows ?? 10;
    this.isLoadingSubject.next(true);
    this.postService.getPosts(this.rows, this.skip).pipe(
      tap(() => {
          this.isLoadingSubject.next(false);
        }),
      catchError((error: HttpErrorResponse) => {
        this.isLoadingSubject.next(false);
        this.messageService.showError(`Ошибка сети: ${ error }`);
        return throwError(() => error);
      })
    ).subscribe();
  }
  
  onDelete(post: IPost): void {
    this.loaderService.showSpinner()
    this.postService.deletePost(post).pipe(
      tap(() => {
        this.loaderService.hideSpinner();
        this.messageService.showInfo('Пост удален');
      }),
      catchError((error: HttpErrorResponse) => {
        this.messageService.showError(`Ошибка: ${ error }`);
        return throwError(() => error);
      })
    ).subscribe();
  }
  
  showModal(): void {
    this.ref = this.dialogService.open(PostEditComponent, {
      header: 'Редактирование поста',
      width: '50vw',
      modal: true,
      breakpoints: {
          '960px': '75vw',
          '640px': '90vw'
      },
      data: this.selectedPost
    });
  }
  
}
