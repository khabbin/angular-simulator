import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { IPost } from './IPost';
import { PostApiService } from './post-api.service';
import { IPostResponse } from './IPostResponse';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class PostService {
  
  private router: Router = inject(Router);
  postApiService: PostApiService = inject(PostApiService);
  private postsSubject: BehaviorSubject<IPost[]> = new BehaviorSubject<IPost[]>([]);
  posts$: Observable<IPost[]> = this.postsSubject.asObservable();
  private totalRecordsSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  totalRecords$: Observable<number> = this.totalRecordsSubject.asObservable();
  
  getPosts(limit?: number, skip?: number): Observable<IPostResponse> {
    return this.postApiService.getPosts(limit, skip).pipe(
      tap((postResponse: IPostResponse) => {
        this.postsSubject.next(postResponse.posts);
        this.totalRecordsSubject.next(postResponse.total);
      })
    )
  }
  
  editPost(postId: number, editedPost: IPost): Observable<IPost[]> {
    return this.postApiService.updatePost({ ...editedPost, id: postId }).pipe(
      map(() => this.postsSubject.value.map((post: IPost) => {
        return postId === post.id
          ? { ...post, title: editedPost.title, tags: editedPost.tags, views: editedPost.views }
          : post;
        })
      ),
      tap((posts: IPost[]) => this.postsSubject.next(posts))
    );
  }
  
  deletePost(selectedPost: IPost): Observable<IPost[]> {
    return this.postApiService.deletePost(selectedPost).pipe(
      map(() => {
        const allPosts: IPost[] = this.postsSubject.value;
        return allPosts.filter((post: IPost) => post.id !== selectedPost.id);
      }),
      tap((filteredPosts: IPost[]) => {
        this.postsSubject.next(filteredPosts);
        const currentTotal: number = this.totalRecordsSubject.value;
        this.totalRecordsSubject.next(currentTotal - 1);
      })
    );
  }
  
  createPost(newPost: IPost): Observable<IPost> {
    return this.postApiService.createPost(newPost).pipe(
      tap((serverPost: IPost) => {
        const currentPosts: IPost[] = this.postsSubject.value;
        this.postsSubject.next([serverPost, ...currentPosts]);
        const currentTotal: number = this.totalRecordsSubject.value;
        this.totalRecordsSubject.next(currentTotal + 1);
      })
    )
  }
  
  goToDetail(post: IPost): void {
    this.router.navigate(['posts', post.id]);
  }
  
}
