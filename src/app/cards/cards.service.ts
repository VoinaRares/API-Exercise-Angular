import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import type { Card } from './card.model';
import { map } from 'rxjs';

const API_URL = 'https://picsum.photos/v2/list';
const LOCAL_URL = 'http://localhost:3000/cards'; //For localhost backend
const MAX_CARDS_PER_PAGE = 6;

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  private httpClient = inject(HttpClient);

  cardsData = signal<Card[] | undefined>(undefined);
  currentFilter = signal<string>('');
  currentPage = signal<number>(1);

  filteredCards = computed(() => {
    const allCards = this.cardsData();
    const filter = this.currentFilter();
    const page = this.currentPage();

    if (!allCards) {
      return undefined;
    }

    const filtered = filter
      ? allCards.filter((card) => card.author === filter)
      : allCards;
    const paginatedCards = filtered.slice(
      (page - 1) * MAX_CARDS_PER_PAGE,
      page * MAX_CARDS_PER_PAGE
    );

    return paginatedCards;
  });

  maxPages = computed(() => {
    const allCards = this.cardsData();
    const filter = this.currentFilter();

    if (!allCards) {
      return 1;
    }

    //Uses ceiling to make sure that the pages fit all the cards
    const filteredCount = filter
      ? allCards.filter((card) => card.author === filter).length
      : allCards.length;
    return Math.ceil(filteredCount / MAX_CARDS_PER_PAGE);
  });

  loadCards() {
    return this.fetchCards(API_URL).pipe(
      map((cards) => {
        this.cardsData.set(cards);
        return cards;
      })
    );
  }

  updateFilter(newFilter: string) {
    this.currentFilter.set(newFilter);
    this.currentPage.set(1);
  }

  updatePage(newPage: number) {
    this.currentPage.set(newPage);
  }

  private fetchCards(url: string) {
    return this.httpClient.get<Card[]>(url);
  }
}
