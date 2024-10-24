import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-filter-posts',
  standalone: true,
  imports: [],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterPostsComponent{
  authors = input.required<string[] | undefined>();
  select = output<string>();

  onSelectAuthor(filter: string){
    this.select.emit(filter);
  }
}
