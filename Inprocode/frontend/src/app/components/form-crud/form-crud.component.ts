// form-crud.component.ts

// Aquest component és el que es mostra en el diàleg de formulari per a afegir o editar un event.
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Inject } from '@angular/core';

// Moduls de material que s'utilitzen en aquest component
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  DateAdapter,
  MatNativeDateModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Moduls de formularis que s'utilitzen en aquest component
import {
  Form,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

// Serveis que s'utilitzen en aquest component
import { ActivityService } from '../../services/activity.service';
import { Activity } from '../../interfaces/activity';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Dialog } from '@angular/cdk/dialog';


@Component({
  selector: 'app-form-crud',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [ MatDialogModule, MatFormField, MatLabel, MatInputModule, MatButtonModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, ReactiveFormsModule, CommonModule, MatProgressSpinnerModule ],
  templateUrl: './form-crud.component.html',
  styleUrl:    './form-crud.component.scss',
})


export class FormCrudComponent implements OnInit {
  form: FormGroup;

  // Aquesta variable s'utilitza per a que la data màxima sigui la data actual
  maxDate = new Date();

  // Aquesta variable s'utilitza per a que es mostri el cercle de carregant quan s'envia el formulari
  loadding: boolean = false;

  // Aquesta variable s'utilitza per a mostrar el títol del diàleg
  operation: string = 'Afegir ';

  // Aquesta variable s'utilitza per a guardar l'id de l'usuari que es vol editar
  id: number | undefined;

  // Aquestes variables s'utilitzen per a mostrar el missatge de sortida
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';


  constructor(
    public dialogRef: MatDialogRef<FormCrudComponent>,
    private fb: FormBuilder,
    private _activityService: ActivityService,
    private _snackBar: MatSnackBar,
    private dateAdapter: DateAdapter<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    // Aquesta línia s'encarrega de que la data màxima sigui la data actual
    this.maxDate = new Date();

    // Aquesta línia s'encarrega de crear el formulari amb les validacions corresponents
    this.form = this.fb.group({
      name:         ['', [Validators.required, Validators.maxLength(15)]],
      surname:      ['', [Validators.required, Validators.maxLength(15)]],
      email:        ['', [Validators.required, Validators.email]],
      age:          ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      distance:     ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      activityDate: ['', Validators.required],
      location:     ['', [Validators.required, Validators.maxLength(30)]],
    });


    // Aquesta línia s'encarrega de que la data màxima sigui la data actual, en espanyol
    dateAdapter.setLocale('es');

    // Aquesta línia s'encarrega de que es mostri el títol del diàleg
    this.id = data.id;
  }

  // Aquest mètode s'executa quan es carrega el component
  ngOnInit(): void {
    this.isEdit(this.id);
  }


  // Mètode per a comprovar si es vol editar un usuari
  isEdit( id:number | undefined ) {
    if(id !== undefined) {
      this.operation = 'Editar ';
      this.getActivity(id);
    };
  }


  // Mètode per a obtenir les dades d'un usuari
  getActivity( id: number)  {
    this._activityService.getActivity(id).subscribe( data => {
      this.form.setValue({
        name:         data.name,
        surname:      data.surname,
        email:        data.email,
        age:          data.age,
        distance:     data.distance,
        activityDate: new Date(data.activityDate),
        location:     data.location,
      });
    })
  }


  // Mètode per a afegir o editar un usuari
  addEditActivity() {

    // Si el formulari no és vàlid, no es fa res
    if (this.form.invalid) {
      return;
    }

    console.log(this.form.value.activityDate);

    // Si el formulari és vàlid, es crea un objecte de tipus User amb les dades del formulari
    const activity: Activity = {
      name:         this.form.value.name,
      surname:      this.form.value.surname,
      email:        this.form.value.email,
      age:          this.form.value.age,
      distance:     this.form.value.distance,
      activityDate: this.form.value.activityDate.toString().slice(0, 10),
      location:     this.form.value.location,
    };

    // S'activa el cercle de carregant
    this.loadding = true;


    if ( this.id == undefined ) {

      // Afegir usuari
      this._activityService.addActivity(activity).subscribe(() => {
        this.exitMessage('afegit');
      });

    } else {

      // Editar usuari
      this._activityService.updateActivity(this.id, activity).subscribe(() => {
          this.exitMessage('actualitzada');
      });
      };

      // S'atura el cercle de carregant i es tanca el diàleg
      this.loadding = false;
      this.dialogRef.close(true);

    }


  // Mètode per a tancar el diàleg
  cancelBtn(): void {
    this.dialogRef.close(false);
  }


  // Mètode per a mostrar un missatge de sortida
  exitMessage(operation: string) {
    this._snackBar.open(`L'activitat s'ha ${operation} amb èxit`, '', {
     horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 2000,
    });
  }
}

