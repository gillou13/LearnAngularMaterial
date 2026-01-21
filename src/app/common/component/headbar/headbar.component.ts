import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
// import { AuthenticationService } from '../common/services/authentication.service';

import { PageStateService } from '../../services/pageState/page-state.service';

@Component({
    selector: 'app-headbar',
    imports: [MatToolbarModule, MatButtonModule, MatIconModule],
    templateUrl: './headbar.component.html',
    styleUrl: './headbar.component.sass'
})
export class HeadbarComponent {
  constructor(private pageStateService: PageStateService) {}

  public afficherState(): void {
    this.pageStateService.afficherState();
  }
}
