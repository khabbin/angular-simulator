import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { IPost } from './IPost';
import { inject } from '@angular/core';
import { PostApiService } from './post-api.service';

export const postResolver: ResolveFn<IPost> = (
  route: ActivatedRouteSnapshot,
) => {
  const postId: string = route.paramMap.get('id')!;
  return inject(PostApiService).getPostById(Number(postId));
};
