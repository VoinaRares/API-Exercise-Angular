import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-filter-posts',
  standalone: true,
  imports: [],
  templateUrl: './filter-posts.component.html',
  styleUrl: './filter-posts.component.css',
})
export class FilterPostsComponent{
  authors = input.required<string[] | undefined>();
  select = output<string>();

  onSelectAuthor(filter: string){
    this.select.emit(filter);
  }
}
