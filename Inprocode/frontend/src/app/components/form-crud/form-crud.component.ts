
// form-crud.component.ts

// Aquest component és el que es mostra en el diàleg de formulari per a afegir o editar un event.

import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef,  } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter,  } from '@angular/material/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../interfaces/user';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-form-crud',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [ MatDialogModule, MatFormField, MatLabel, MatInputModule,  MatButtonModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, ReactiveFormsModule, CommonModule ],
  templateUrl: './form-crud.component.html',
  styleUrl: './form-crud.component.scss',
})


export class FormCrudComponent {

  form: FormGroup;

  // Aquesta variable s'utilitza per a que la data màxima sigui la data actual
  maxDate = new Date();


  constructor( public dialogRef: MatDialogRef<FormCrudComponent>,
    private fb: FormBuilder ) {

      // Aquesta línia s'encarrega de que la data màxima sigui la data actual
      this.maxDate = new Date();

      // Aquesta línia s'encarrega de crear el formulari amb les validacions corresponents
      this.form = this.fb.group({
        name:         ['', [Validators.required, Validators.maxLength(15)] ],
        surname:      ['', [Validators.required, Validators.maxLength(15)] ],
        email:        ['', [Validators.required, Validators.email ] ],
        age:          ['', [Validators.required, Validators.pattern('^[0-9]*$') ]],
        distance:     ['', [Validators.required, Validators.pattern('^[0-9]*$') ]],
        activityDate: ['', Validators.required, ],
        location:     ['', [Validators.required, Validators.maxLength(30)] ],
      });

    }

    // Aquest mètode s'executa quan es fa clic al botó de guardar
    addEditEvent() {

      // Casos d'ús per a afegir o editar un event
          // const nom = this.form.get('name')?.value;
          // const nom = this.form.value.name;
          // console.log(nom);

      // Si el formulari no és vàlid, no es fa res
      if (this.form.invalid) {
        return;
      }

      // Si el formulari és vàlid, es crea un objecte de tipus User amb les dades del formulari
      const user: User = {
        name:         this.form.value.name,
        surname:      this.form.value.surname,
        email:        this.form.value.email,
        age:          this.form.value.age,
        distance:     this.form.value.distance,
        activityDate: this.form.value.activityDate,
        location:     this.form.value.location,
      };
      console.log(this.form);
    }

    // Aquest mètode s'executa quan es fa clic al botó de cancel·lar
    cancelBtn(): void{
      this.dialogRef.close();
    }

}
