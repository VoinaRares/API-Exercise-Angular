import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { CardComponent } from './card/card.component';
import { CardsService } from './cards.service';
import { FilterComponent } from '../filter/filter.component';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CardComponent, FilterComponent, PaginationComponent],
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent implements OnInit {
  private cardsService = inject(CardsService);
  private destroyRef = inject(DestroyRef);

  filteredCards = this.cardsService.filteredCards;
  maxPages = this.cardsService.maxPages;
  currentPage = this.cardsService.currentPage;

  authors = signal<string[]>([]);

  // Establishes subscription between service and component
  ngOnInit(): void {
    const cardsSubscription = this.cardsService.loadCards().subscribe({
      next: (cards) => {
        this.authors.set([...new Set(cards.map(card => card.author))]);
      },
      error: (error) =>{
        console.error(error);
      }
    });

    this.destroyRef.onDestroy(() => {
      cardsSubscription.unsubscribe();
    });
  }

  onChangeFilter(newFilter: string) {
    this.cardsService.updateFilter(newFilter);
  }

  onChangePage(newPageNumber: number) {
    this.cardsService.updatePage(newPageNumber);
  }
}
