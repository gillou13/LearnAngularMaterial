import { Component, OnDestroy, OnInit } from '@angular/core';
import { BasePageComponent } from '../common/component/base-page/base-page.component';
import { NavigationLink } from '../common/services/navigation/navigation-link';
import { Router } from '@angular/router';
import { NavigationService } from '../common/services/navigation/navigation.service';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-test-diag-on-close',
  standalone: true,
  imports: [CommonModule, FormsModule, MatRadioModule, ReactiveFormsModule],
  templateUrl: './test-diag-on-close.component.html',
  styleUrl: './test-diag-on-close.component.sass',
})
export class TestDiagOnCloseComponent
  extends BasePageComponent
  implements OnDestroy, OnInit
{
  public withDialog: boolean = true;

  public formData!: FormControl<string | null>;

  public override ngOnInit(): void {
    super.ngOnInit();

    // Récupération du formulaire si existant :
    if (this.currentLink?.formData != undefined) {
      this.formData = this.currentLink.formData as FormControl<string | null>;
    }
    // Sinon construction 'normale'
    else {
      this.formData = new FormControl<string>('test');
      this.formData.addValidators(Validators.required);
      this.currentLink.formData = this.formData;
    }
  }

  protected override createLink(url: string): NavigationLink {
    const link = new NavigationLink(url, 'diag on close', true, 'etat', 'icon');

    // dans le cas d'une vérification lors de la suppression.
    return link;
  }
}
