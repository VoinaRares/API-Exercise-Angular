import { Component, Input, signal } from '@angular/core';
import type { Card } from '../card.model';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input({required: true}) cardData! :Card;
}
