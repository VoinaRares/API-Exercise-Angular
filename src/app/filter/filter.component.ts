import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterComponent{
  options = input.required<string[] | undefined>();
  select = output<string>();

  onSelectOption(filter: string){
    this.select.emit(filter);
  }
}
