import { Component, Input, signal } from '@angular/core';
import type { Post } from '../card.model';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class PostComponent {
  @Input({required: true}) postData! :Post;
}
