import { Routes } from '@angular/router';
import { postResolver } from '../features/posts/post.resolver';
import { authGuard } from '../features/auth/guards/auth.guard';
import { adminGuard } from '../features/auth/guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('../home-page/home-page.component').then(m => m.HomePageComponent),
  },
  {
    path: 'users',
    canActivate: [authGuard, adminGuard],
    loadComponent: () =>
      import('../users-page/users-page.component').then(
        m => m.UsersPageComponent
      ),
  },
  {
    path: 'posts',
    canActivate: [authGuard, adminGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('../features/posts/posts.component').then(
            m => m.PostsComponent
          ),
      },
      {
        path: 'create',
        loadComponent: () =>
          import('../features/posts/post-create/post-create.component').then(
            m => m.PostCreateComponent
          ),
      },
      {
        path: ':id',
        loadComponent: () =>
          import('../features/posts/post-detail/post-detail.component').then(
            m => m.PostDetailComponent
          ),
        resolve: { post: postResolver },
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('../features/auth/components/login/login.component').then(
        m => m.LoginComponent
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('../not-found-page/not-found-page.component').then(
        m => m.NotFoundPageComponent
      ),
  },
];
