import { Component, OnDestroy } from '@angular/core';
import { BaseComponent } from '../common/component/basecomponent/base.component';
import { NavigationLink } from '../common/services/navigation/navigation-link';
import { Router } from '@angular/router';
import { NavigationService } from '../common/services/navigation/navigation.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-test-diag-on-close',
  standalone: true,
  imports: [CommonModule, FormsModule, MatRadioModule],
  templateUrl: './test-diag-on-close.component.html',
  styleUrl: './test-diag-on-close.component.sass',
})
export class TestDiagOnCloseComponent
  extends BaseComponent
  implements OnDestroy
{
  public withDialog: boolean = true;

  // constructor(
  //   router: Router,
  //   navigationService: NavigationService
  // ) {
  //   super(router, navigationService);
  // }

  protected override createLink(): NavigationLink {
    const link = new NavigationLink(
      this.router.url,
      'diag on close',
      true,
      'etat',
      'icon'
    );
    // dans le cas d'une vérification lors de la suppression.
    this.subscriptions.push(link.deleteSubject.subscribe(() => this.close()));
    return link;
  }

  private close() {
    if (this.withDialog) {
      console.log('on veux me fermer!....');
      this.navigationService.forceDeleteLink(this.currentLink);
    } else {
      this.navigationService.forceDeleteLink(this.currentLink);
    }
  }
}
