import { Component } from '@angular/core';
import { BaseComponent } from '../../common/component/basecomponent/base.component';
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

@Component({
  selector: 'app-form-with-control-value-accessor',
  standalone: true,
  templateUrl: './form-with-control-value-accessor.component.html',
  styleUrl: './form-with-control-value-accessor.component.sass',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormControlPipe,
    InputNumberComponent,
  ],
})
export class FormWithControlValueAccessorComponent extends BaseComponent {
  protected override createLink(url: string): NavigationLink {
    return new NavigationLink(url, 'form number', true, 'etat', 'icon');
  }

  public form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    super();

    this.form = this.formBuilder.group({
      number1: 0,
      number2: 0,
    });

    (this.form.get('number1') as FormControl).addValidators(
      Validators.max(100)
    );
    (this.form.get('number2') as FormControl).addValidators(
      Validators.max(100)
    );
  }
}
