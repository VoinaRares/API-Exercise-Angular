import { Component, DestroyRef, inject, OnInit, output, signal } from '@angular/core';
import { CardComponent } from './card/card.component';
import { CardsService } from './cards.service';
import { FilterComponent } from '../filter/filter.component';
import { PaginationComponent } from '../pagination/pagination.component';

import type { Card } from './card.model';

const MAX_CARDS_PER_PAGE = 6;

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CardComponent, FilterComponent, PaginationComponent],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css',
})
export class CardsComponent implements OnInit {
  cards = signal<Card[] | undefined>(undefined);
  filteredCards = signal<Card[] | undefined>(undefined);
  authors = signal<string[] | undefined>(undefined);

  private cardsService = inject(CardsService);
  private destroyRef = inject(DestroyRef);

  changedFilter = output<number>();

  currentPage = 1;
  currentFilter = '';
  maxPages = 1;

  private changeMaxPages(cardAmount: number){
    if(Math.floor(cardAmount / MAX_CARDS_PER_PAGE) === cardAmount / MAX_CARDS_PER_PAGE){
      this.maxPages = cardAmount / MAX_CARDS_PER_PAGE;
    }
    else{
      this.maxPages = Math.floor(cardAmount / MAX_CARDS_PER_PAGE) + 1;
    }
  }

  ngOnInit(): void {
    const subscription = this.cardsService.loadCardsData().subscribe({
      next: (cards) => {
        console.log(cards);
        this.cards.set(cards);
        this.filteredCards.set(cards.slice(0, MAX_CARDS_PER_PAGE));
        this.changeMaxPages(cards.length);
        this.authors.set([
          ...new Set(
            cards.map((card) => {
              return card.author;
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
      this.filteredCards.set(
        this.cards()
          ?.filter((card) => {
            return card.author === this.currentFilter;
          })
      );
      this.changeMaxPages(this.filteredCards()!.length);
      this.filteredCards.set(this.filteredCards()?.slice(0, MAX_CARDS_PER_PAGE));
    } else {
      this.filteredCards.set(this.cards());
      this.changeMaxPages(this.filteredCards()!.length);
      this.filteredCards.set(this.filteredCards()?.slice(0, MAX_CARDS_PER_PAGE))
      this.currentFilter = '';
    }
    this.currentPage = 1;
  }

  onChangePage(newPageNumber: number) {
    let filtered = this.cards();
    this.currentPage = newPageNumber;

    if (this.currentFilter !== '') {
      filtered = filtered?.filter((card) => {
        return card.author === this.currentFilter;
      });
    }

    this.filteredCards.set(
      filtered?.slice(
        (this.currentPage - 1) * MAX_CARDS_PER_PAGE,
        this.currentPage * MAX_CARDS_PER_PAGE
      )
    );
  }
}
