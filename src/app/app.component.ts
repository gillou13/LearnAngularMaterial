import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeadbarComponent } from './headbar/headbar.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeadbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'testMaterial';
}
