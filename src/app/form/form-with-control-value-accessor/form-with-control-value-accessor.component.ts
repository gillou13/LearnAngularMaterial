import { Component, OnDestroy, OnInit } from '@angular/core';
import { BasePageComponent } from '../../common/component/base-page/base-page.component';
import { NavigationLink } from '../../common/services/navigation/navigation-link';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormControlPipe } from '../../common/pipe/form-control.pipe';
import { InputNumberComponent } from './input-number/input-number.component';
import { MatButtonModule } from '@angular/material/button';
import { PageStateService } from '../../common/services/pageState/page-state.service';

@Component({
  selector: 'app-form-with-control-value-accessor',
  templateUrl: './form-with-control-value-accessor.component.html',
  styleUrl: './form-with-control-value-accessor.component.sass',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputNumberComponent,
    MatButtonModule,
  ],
})
export class FormWithControlValueAccessorComponent
  extends BasePageComponent
  implements OnDestroy
{
  protected override createLink(url: string): NavigationLink {
    return new NavigationLink(url, 'form number', true, 'etat', 'icon');
  }

  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public pageStateService: PageStateService
  ) {
    super();

    // Si l'état du formulaire est enregistrer on le récupère.
    // Sinon on le créer.
    if (this.pageStateService.hasStates()) {
      this.form = this.pageStateService.getStates();
    } else {
      this.form = this.setNewFromGroup();
    }
  }

  private setNewFromGroup(): FormGroup {
    const form = this.formBuilder.group({
      number1: 0,
      number2: 0,
    });

    (form.get('number1') as FormControl).addValidators(Validators.max(100));
    (form.get('number2') as FormControl).addValidators(Validators.max(100));

    return form;
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    // Avant de détruire le composant on enregistre l'état du formulaire.
    this.pageStateService.addStates(this.currentLink.url, this.form);
  }

  toto() {
    console.log('toto');
  }
}
