import { Component, inject } from '@angular/core';

import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
  FormControlStatus,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { BaseComponent } from '../common/component/basecomponent/base.component';
import { NavigationLink } from '../common/services/navigation/navigation-link';
import { NavigationStart } from '@angular/router';
import { FormFrameComponent } from '../common/component/form-frame/form-frame.component';
import { FrameModel } from '../common/component/form-frame/model/frame-model';
import { FrameButtonModel } from '../common/component/form-frame/model/frame-button-model';
import {
  endWith,
  finalize,
  Observable,
  of,
  startWith,
  Subject,
  switchMap,
} from 'rxjs';
import { TrucApiService } from './truc-api.service';
import { TrucModel } from './model/truc-model';

@Component({
  selector: 'app-truc',
  templateUrl: './truc.component.html',
  styleUrl: './truc.component.scss',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    FormFrameComponent,
  ],
})
export class TrucComponent extends BaseComponent {
  private apiService: TrucApiService;

  constructor() {
    super();

    //DI :
    this.apiService = inject(TrucApiService);

    // Initialisation du formulaire selon la navigation client
    // TODO GBE : ou les params d'entrés.
    this.addressForm =
      (this.currentLink.formData as FormGroup) ?? this.initFormData();

    // MAJ du formulaire dans currentLink.
    this.currentLink.formData = this.addressForm;

    // Init des actions.
    this.initActions();

    // Initialisation du cadre du formulaire (form-frame).
    this.initFrame();
  }

  protected override createLink(url: string): NavigationLink {
    const link = new NavigationLink(url, 'truc', true, 'etat', 'icon');
    return link;
  }

  private fb = inject(FormBuilder);

  /** Formulaire */
  public addressForm!: FormGroup;

  /** Paramètres du cadre du formulaire (avec les boutons d'action.) */
  public frameModel!: FrameModel;

  // Actions liées au formulaire.
  /** Action d'enregistrement. */
  public saveAction: Subject<any> = new Subject<any>();
  /** Action de fermeture de la page. */
  public closeAction: Subject<any> = new Subject<any>();
  /** Action d'enregistrement et de fermeture de l'onget. */
  public saveCloseAction: Subject<any> = new Subject<any>();

  hasUnitNumber = false;

  states = [
    { name: 'Alabama', abbreviation: 'AL' },
    { name: 'Alaska', abbreviation: 'AK' },
    { name: 'American Samoa', abbreviation: 'AS' },
    { name: 'Arizona', abbreviation: 'AZ' },
    { name: 'Arkansas', abbreviation: 'AR' },
    { name: 'California', abbreviation: 'CA' },
    { name: 'Colorado', abbreviation: 'CO' },
    { name: 'Connecticut', abbreviation: 'CT' },
    { name: 'Delaware', abbreviation: 'DE' },
    { name: 'District Of Columbia', abbreviation: 'DC' },
    { name: 'Federated States Of Micronesia', abbreviation: 'FM' },
    { name: 'Florida', abbreviation: 'FL' },
    { name: 'Georgia', abbreviation: 'GA' },
    { name: 'Guam', abbreviation: 'GU' },
    { name: 'Hawaii', abbreviation: 'HI' },
    { name: 'Idaho', abbreviation: 'ID' },
    { name: 'Illinois', abbreviation: 'IL' },
    { name: 'Indiana', abbreviation: 'IN' },
    { name: 'Iowa', abbreviation: 'IA' },
    { name: 'Kansas', abbreviation: 'KS' },
    { name: 'Kentucky', abbreviation: 'KY' },
    { name: 'Louisiana', abbreviation: 'LA' },
    { name: 'Maine', abbreviation: 'ME' },
    { name: 'Marshall Islands', abbreviation: 'MH' },
    { name: 'Maryland', abbreviation: 'MD' },
    { name: 'Massachusetts', abbreviation: 'MA' },
    { name: 'Michigan', abbreviation: 'MI' },
    { name: 'Minnesota', abbreviation: 'MN' },
    { name: 'Mississippi', abbreviation: 'MS' },
    { name: 'Missouri', abbreviation: 'MO' },
    { name: 'Montana', abbreviation: 'MT' },
    { name: 'Nebraska', abbreviation: 'NE' },
    { name: 'Nevada', abbreviation: 'NV' },
    { name: 'New Hampshire', abbreviation: 'NH' },
    { name: 'New Jersey', abbreviation: 'NJ' },
    { name: 'New Mexico', abbreviation: 'NM' },
    { name: 'New York', abbreviation: 'NY' },
    { name: 'North Carolina', abbreviation: 'NC' },
    { name: 'North Dakota', abbreviation: 'ND' },
    { name: 'Northern Mariana Islands', abbreviation: 'MP' },
    { name: 'Ohio', abbreviation: 'OH' },
    { name: 'Oklahoma', abbreviation: 'OK' },
    { name: 'Oregon', abbreviation: 'OR' },
    { name: 'Palau', abbreviation: 'PW' },
    { name: 'Pennsylvania', abbreviation: 'PA' },
    { name: 'Puerto Rico', abbreviation: 'PR' },
    { name: 'Rhode Island', abbreviation: 'RI' },
    { name: 'South Carolina', abbreviation: 'SC' },
    { name: 'South Dakota', abbreviation: 'SD' },
    { name: 'Tennessee', abbreviation: 'TN' },
    { name: 'Texas', abbreviation: 'TX' },
    { name: 'Utah', abbreviation: 'UT' },
    { name: 'Vermont', abbreviation: 'VT' },
    { name: 'Virgin Islands', abbreviation: 'VI' },
    { name: 'Virginia', abbreviation: 'VA' },
    { name: 'Washington', abbreviation: 'WA' },
    { name: 'West Virginia', abbreviation: 'WV' },
    { name: 'Wisconsin', abbreviation: 'WI' },
    { name: 'Wyoming', abbreviation: 'WY' },
  ];

  /**
   * Initialise le formulaire selon les params d'entrée
   * TODO GBE : oui c'est a finaliser je sais...
   * @returns Le FromGroup du composant.
   */
  private initFormData(): FormGroup {
    // const form = this.fb.group({
    //   company: null,
    //   firstName: [null, Validators.required],
    //   lastName: [null, Validators.required],
    //   address: [null, Validators.required],
    //   address2: null,
    //   city: [null, Validators.required],
    //   state: [null, Validators.required],
    //   postalCode: [
    //     null,
    //     Validators.compose([
    //       Validators.required,
    //       Validators.minLength(5),
    //       Validators.maxLength(5),
    //     ]),
    //   ],
    //   shipping: ['free', Validators.required],
    // });
    // la flém de tous saisir a chaque fois...
    const form = this.fb.group({
      company: 'Gillou&Co',
      firstName: ['Gilles', Validators.required],
      lastName: ['Biguet', Validators.required],
      address: ['Par ici', Validators.required],
      address2: null,
      city: ['Thizy', Validators.required],
      state: ['Proxima du sentor', Validators.required],
      postalCode: [
        '69240',
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(5),
        ]),
      ],
      shipping: ['free', Validators.required],
    });

    return form;
  }

  /** Initialisation des actions du formulaire. */
  private initActions() {
    // L'enregistrement
    this.subscriptions.push(
      this.saveAction
        .pipe(
          switchMap(() => {
            // console.log('action save', this.addressForm.value, this.apiService);
            return this.save();
          }),
          // on réinit le formulaire.
          switchMap((resultSave: boolean) => {
            if (resultSave === true) {
              this.addressForm = this.initFormData();
            }
            return of(resultSave);
          })
        )
        .subscribe()
      // .subscribe((result: boolean) => {
      //   console.log('action save fin.', result);
      // })
    );

    // le Close
    this.subscriptions.push(
      this.closeAction
        .pipe(
          switchMap(() => {
            // console.log('on ferme!');
            return this.navigationService.onDeleteLink(this.currentLink);
          })
        )
        .subscribe()
      // .subscribe((result: boolean) => {
      //   console.log('action saveClose fin.', result);
      // })
    );

    // le save & close
    this.subscriptions.push(
      this.saveCloseAction
        .pipe(
          switchMap(() => {
            return this.save();
          }),
          switchMap((result: boolean) => {
            if (result) {
              // console.log('... on quitte.');
              return this.navigationService.onDeleteLink(this.currentLink);
            }
            return of(false);
          })
        )
        .subscribe()
      // .subscribe((result: boolean) => {
      //   console.log('saveClose fin', result);
      // })
    );
  }

  /** Initialisation du cadre du formulaire. */
  private initFrame(): void {
    this.frameModel = new FrameModel();
    this.frameModel.title = 'Truc';
    this.frameModel.name = this.addressForm.get('company')?.value;
    // Pour changer le nom en direct.
    this.subscriptions.push(
      this.addressForm.controls['company'].valueChanges.subscribe(
        (value: string) => {
          this.frameModel.name = value;
        }
      )
    );

    // // Test pour la lecture seul :
    // this.frameModel.saveVisible = false;
    // this.addressForm.disable();

    // liaison des actions.
    this.frameModel.saveAction = this.saveAction;
    this.frameModel.closeAction = this.closeAction;
    this.frameModel.saveCloseAction = this.saveCloseAction;
  }

  onSubmit(): void {
    alert('Thanks!');
  }

  /** function pour l'enregistrement du formulaire.
   * Si apiService.save == true, on réinit le formulaire.
   */
  public save(): Observable<boolean> {
    return of(void 0).pipe(
      // Gestion du loading.
      switchMap(() => {
        this.frameModel.inLoading = true;
        return of(void 0);
      }),
      // appel à l'API.
      switchMap(() => {
        return this.apiService.save(this.addressForm.value as TrucModel);
      }),
      // on réinit le formulaire. si le save est OK.
      switchMap((resultSave: boolean) => {
        if (resultSave === true) {
          // console.log('on réinit le formulaire.');
          this.addressForm = this.initFormData();
          this.currentLink.formData = this.addressForm;
        }
        // Pour les tests d'erreur en attendant le snakBar.
        // else {
        //   console.log('save en erreur');
        // }
        return of(resultSave);
      }),
      // Gestion du loading (fin).
      finalize(() => {
        // console.log('finalize de save');
        this.frameModel.inLoading = false;
      })
    );
  }
}
