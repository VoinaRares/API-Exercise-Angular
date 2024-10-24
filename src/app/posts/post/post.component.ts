import { Component, Input, signal } from '@angular/core';
import type { Post } from '../post.model';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  @Input({required: true}) postData! :Post;
}
