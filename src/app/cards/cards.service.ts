import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import type { Card } from './card.model';
import { map } from 'rxjs';

const API_URL = 'https://picsum.photos/v2/list';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  private httpClient = inject(HttpClient);
  private cardsData = signal<Card[]>([]);

  loadedPostsData = this.cardsData.asReadonly();

  loadCardsData() {
    return this.fetchCards('http://localhost:3000/cards');
  }

  loadCardsFromAPI() {
    return this.fetchCards(API_URL);
  }

  private fetchCards(url: string) {
    return this.httpClient.get<Card[]>(url);
  }
}
