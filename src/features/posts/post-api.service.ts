import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPostResponse } from './IPostResponse';
import { IPost } from './IPost';

@Injectable({
  providedIn: 'root',
})
export class PostApiService {
  
  private http: HttpClient = inject(HttpClient);
  private api: string = 'https://dummyjson.com/posts';
  
  getPosts(limit: number = 10, skip: number = 0): Observable<IPostResponse> {
    return this.http.get<IPostResponse>(`${ this.api }?limit=${ limit }&skip=${ skip }`);
  }
  
  getPostById(id: number): Observable<IPost> {
    return this.http.get<IPost>(`${ this.api }/${ id }`);
  }
  
  createPost(post: IPost): Observable<IPost> {
    return this.http.post<IPost>(`${ this.api }/add`, post);
  }
  
  updatePost(post: IPost): Observable<IPost> {
    return this.http.patch<IPost>(`${ this.api }/${ post.id }`, post);
  }
  
  deletePost(post: IPost): Observable<IPost> {
    return this.http.delete<IPost>(`${ this.api }/${ post.id }`);
  }
  
}