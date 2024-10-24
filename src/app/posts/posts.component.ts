import { Component, DestroyRef, inject, OnInit, output, signal } from '@angular/core';
import { PostComponent } from './post/post.component';
import { Post } from './post.model';
import { PostsService } from './posts.service';
import { FilterPostsComponent } from './filter-posts/filter-posts.component';
import { PaginationComponent } from './pagination/pagination.component';

const SHOW_COUNT = 6;

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [PostComponent, FilterPostsComponent, PaginationComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent implements OnInit {
  posts = signal<Post[] | undefined>(undefined);
  filteredPosts = signal<Post[] | undefined>(undefined);
  authors = signal<string[] | undefined>(undefined);

  private postsService = inject(PostsService);
  private destroyRef = inject(DestroyRef);

  changedFilter = output<number>();

  currentPage = 1;
  currentFilter = '';
  maxPages = 1;

  private changeMaxPages(postAmount: number){
    console.log(postAmount);
    console.log(postAmount / SHOW_COUNT);
    if(Math.floor(postAmount / SHOW_COUNT) === postAmount / SHOW_COUNT){
      this.maxPages = postAmount / SHOW_COUNT;
    }
    else{
      this.maxPages = Math.floor(postAmount / SHOW_COUNT) + 1;
    }
  }

  ngOnInit(): void {
    const subscription = this.postsService.loadPostsData().subscribe({
      next: (posts) => {
        this.posts.set(posts);
        this.filteredPosts.set(posts.slice(0, SHOW_COUNT));
        this.changeMaxPages(posts.length);
        this.authors.set([
          ...new Set(
            posts.map((post) => {
              return post.author;
            })
          ),
        ]);
      },
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onChangeFilter(newFilter: string) {
    if (newFilter !== '') {
      this.currentFilter = newFilter;
      this.filteredPosts.set(
        this.posts()
          ?.filter((post) => {
            return post.author === this.currentFilter;
          })
      );
      this.changeMaxPages(this.filteredPosts()!.length);
      this.filteredPosts.set(this.filteredPosts()?.slice(0, SHOW_COUNT));
    } else {
      this.filteredPosts.set(this.posts());
      this.changeMaxPages(this.filteredPosts()!.length);
      this.filteredPosts.set(this.filteredPosts()?.slice(0, SHOW_COUNT))
      this.currentFilter = '';
    }
    this.currentPage = 1;
  }

  onChangePage(newPageNumber: number) {
    let filtered = this.posts();
    this.currentPage = newPageNumber;

    if (this.currentFilter !== '') {
      filtered = filtered?.filter((post) => {
        return post.author === this.currentFilter;
      });
    }

    this.filteredPosts.set(
      filtered?.slice(
        (this.currentPage - 1) * SHOW_COUNT,
        this.currentPage * SHOW_COUNT
      )
    );
  }
}
