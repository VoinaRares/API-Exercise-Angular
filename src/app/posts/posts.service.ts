import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Post } from './post.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private httpClient = inject(HttpClient);
  private postsData = signal<Post[]>([]);

  loadedPostsData = this.postsData.asReadonly();

  loadPostsData() {
    return this.fetchPlaces('http://localhost:3000/posts');
  }

  private fetchPlaces(url: string) {
    return this.httpClient.get<{ posts: Post[] }>(url).pipe(
      map((resData) => resData.posts));
  }
}
