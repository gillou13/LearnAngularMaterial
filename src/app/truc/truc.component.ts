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
import { Subject } from 'rxjs';

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
  constructor() {
    super();

    // Initialisation du formulaire selon la navigation client
    // TODO GBE : ou les params d'entrés.
    this.addressForm =
      (this.currentLink.formData as FormGroup) ?? this.initFormData();

    // MAJ du formulaire dans currentLink.
    this.currentLink.formData = this.addressForm;

    // Init des subjects.
    this.saveAction = new Subject<any>();

    this.subscriptions.push(
      this.saveAction.subscribe((value: any) => {
        console.log('action save', value);
      })
    );

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

  public saveAction!: Subject<any>;

  public closeAction!: Subject<any>;

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
    const form = this.fb.group({
      company: null,
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      address: [null, Validators.required],
      address2: null,
      city: [null, Validators.required],
      state: [null, Validators.required],
      postalCode: [
        null,
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

    // Configuration du save :
    this.frameModel.saveButton = new FrameButtonModel();
    this.frameModel.saveButton.label = 'Enregistrer';
    this.frameModel.saveButton.isVisible = true;
    this.frameModel.saveButton.isAvailable = this.addressForm.valid;
    // Selon l'état du formulaire :
    this.subscriptions.push(
      this.addressForm.statusChanges.subscribe((status: FormControlStatus) => {
        console.log('test status: ', status);
        if (status === 'INVALID') {
          this.frameModel.saveButton!.isAvailable = false;
        } else if (status === 'VALID') {
          this.frameModel.saveButton!.isAvailable = true;
        }
      })
    );
    this.frameModel.saveButton!.action = this.saveAction;
    this.frameModel.closeAction = this.closeAction;
  }

  onSubmit(): void {
    alert('Thanks!');
  }
}
