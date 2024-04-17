import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-test1',
  standalone: true,
  imports: [MatSlideToggleModule],
  templateUrl: './test1.component.html',
  styleUrl: './test1.component.sass'
})
export class Test1Component {

}
