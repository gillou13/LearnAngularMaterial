import { Component, EventEmitter, inject, OnInit } from '@angular/core';
import { BaseFormComponent } from '../../common/component/base-form/base-form.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable, of, tap } from 'rxjs';
import { NavigationLink } from '../../common/services/navigation/navigation-link';
import { StateApiFakeService } from '../../common/services/fakeApi/state.service';
import { Guid } from '../../tools/guid';
import { FormStatus } from '../../common/component/base-form/models/form-status';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@Component({
    selector: 'app-test-angular-select',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatAutocompleteModule,
    ],
    templateUrl: './test-angular-select.component.html',
    styleUrl: './test-angular-select.component.scss'
})
export class TestAngularSelectComponent
  extends BaseFormComponent<FormGroup>
  implements OnInit
{
  private readonly fb = inject(FormBuilder);
  private readonly stateService = inject(StateApiFakeService);

  public states: any[] = this.stateService.states;

  protected override buildFormData(): Observable<FormGroup<any>> {
    const form = this.fb.group({
      id: [Guid.newGuid(), Validators.required],
      simple: 'CA',
      simpleWithoutVal: undefined,
      cpl: undefined,
      cpl2: undefined,
    });
    return of(form);
  }
  protected override InitStatus(): Observable<boolean> {
    // pour le moment juste un fack initStatus.
    return of(true).pipe(
      tap(() => {
        this.formStatus = new FormStatus();
        this.formStatus.mode = 'new';
      })
    );
  }
  public override save(): Observable<boolean> {
    return of(true);
  }
  protected override createLink(url: string): NavigationLink {
    return new NavigationLink(url, 'test angular-select', true, 'etat', 'icon');
  }

  /**
   * Permet de supprimer la valeur indiqué dans le formControl.
   */
  public simpleDeleteOption(event: any, ctrlName: string) {
    // console.log(event, ctrlName);
    this.formData.get(ctrlName)?.setValue(undefined);
    event.stopPropagation();
  }

  /** Permet d'afficher seulement le name d'un state tous en ayant la valeur complète dans l'input. */
  public displayFn(element: { abbreviation: string; name: string }): string {
    return element?.name ?? '';
  }

  public search: FormControl = new FormControl('');

  public autocompleteClosed(): void {
    // const cpl2Value = this.formData.get('cpl2')?.value ?? undefined;
    // if (
    //   this.search.touched &&
    //   cpl2Value !== undefined &&
    //   this.search.value !== cpl2Value
    // ) {
    //   console.log('closed and touched and different');
    // }
  }

  public override async ngOnInit(): Promise<void> {
    super.ngOnInit();

    //Init du double Input.
    this.subscriptions.push(
      this.search.valueChanges
        .pipe(
          tap((value: any) => {
            console.log('value: ', value);
            if (
              value !== undefined &&
              value.hasOwnProperty('name') &&
              value.hasOwnProperty('abbreviation')
            ) {
              this.formData.get('cpl2')?.setValue(value);
              this.search.markAsPristine();
              this.search.markAsUntouched();
              console.log('setValue');
            }
          })
        )
        .subscribe()
    );
  }
}
