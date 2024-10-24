import { Component, output, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  @Input({}) pageNumber: number = 1;
  @Input({required: true}) maxPages!: number;
  pageOutput = output<number>();


  onPageChange(amount: number){
    this.pageNumber += amount;
    this.pageOutput.emit(this.pageNumber);

  }
}
