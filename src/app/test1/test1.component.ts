import { Component, OnInit } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BaseComponent } from '../common/component/basecomponent/base.component';
import { NavigationService } from '../common/services/navigation/navigation.service';
import { Router } from '@angular/router';
import { NavigationLink } from '../common/services/navigation/navigation-link';
import { DialogService } from '../common/services/dialogService/dialog.service';

@Component({
  selector: 'app-test1',
  standalone: true,
  imports: [MatSlideToggleModule],
  templateUrl: './test1.component.html',
  styleUrl: './test1.component.sass',
})
export class Test1Component extends BaseComponent {
  public resultDialog: string;

  constructor(private dialogService: DialogService) {
    super();
    this.resultDialog = '';
  }

  protected override createLink(url: string): NavigationLink {
    return new NavigationLink(url, 'test1', true, 'etat', 'icon');
  }

  public toggleOnChange(event: any): void {
    this.currentLink!.label = `test 1 ${event.checked ? ' vivant' : ' mort'}`;
    // this.navigationService.updateLink(this.currentLink!);
  }

  // Pour les tests des dialogs.
  public testDialog1() {
    this.dialogService
      .dialogYesNo('titre', 'question à la con...')
      .subscribe((result: boolean) => {
        this.resultDialog = result
          ? "l'utilisateur à approuvé"
          : "Il n'a pas aimer...";
      });
  }

  public testDialog2() {
    this.dialogService
      .dialogYesNo(
        'titre',
        'Lonnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnngue question'
      )
      .subscribe((result: boolean) => {
        this.resultDialog = result ? 'petit oui' : 'petit non.';
      });
  }

  public testDialog3() {
    this.dialogService
      .dialogYesNo(undefined, 'juste la question')
      .subscribe((result: boolean) => {
        this.resultDialog = result
          ? 'juste la question: oui'
          : 'juste la question: non.';
      });
  }

  public testDialog4() {
    this.dialogService
      .dialogYesNo('juste le titre', undefined)
      .subscribe((result: boolean) => {
        this.resultDialog = result
          ? 'juste le titre: oui'
          : 'juste le titre: non.';
      });
  }
}
