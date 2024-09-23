import { Component } from '@angular/core';
import { BaseFormComponent } from '../../common/component/base-form/base-form.component';
import { FormGroup, AbstractControl, FormArray } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { NavigationLink } from '../../common/services/navigation/navigation-link';
import { NavigationService } from '../../common/services/navigation/navigation.service';
import { TrucModel } from '../truc/model/truc-model';

@Component({
  selector: 'app-test-base',
  standalone: true,
  imports: [],
  templateUrl: './test-base.component.html',
  styleUrl: './test-base.component.sass',
})
export class TestBaseComponent {
  // extends BaseFormComponent<FormGroup>
  // protected override buildFormData(): Observable<FormGroup<any>> {
  //   throw new Error('Method not implemented.');
  // }
  // protected override createLink(url: string): NavigationLink {
  //   throw new Error('Method not implemented.');
  // }
}
