import { Component, inject } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { IPost } from '../IPost';
import { map, Observable, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-post-detail',
  imports: [AsyncPipe],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss',
})
export class PostDetailComponent {
  
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  
  post$: Observable<IPost> = this.activatedRoute.data.pipe(
    map((data: Data) => data['post'] as IPost),
  )
  
}
