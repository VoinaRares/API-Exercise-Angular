import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PostsComponent } from "./cards/cards.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PostsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'exercise';
}
