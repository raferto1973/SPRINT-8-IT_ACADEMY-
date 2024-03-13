

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
  imports: [ MatDialogModule, MatFormField, MatLabel, MatInputModule,  MatButtonModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, ReactiveFormsModule, CommonModule  ],
  templateUrl: './form-crud.component.html',
  styleUrl: './form-crud.component.scss',
})



export class FormCrudComponent {

  form: FormGroup;


  constructor( public dialogRef: MatDialogRef<FormCrudComponent>,
    private fb: FormBuilder ) {

      this.form = this.fb.group({
        name:         ['', Validators.required, ],
        surname:      ['', Validators.required, ],
        email:        ['', Validators.required, ],
        age:          ['', Validators.required, ],
        distance:     ['', Validators.required, ],
        activityDate: ['', Validators.required, ],
        location:     ['', Validators.required, ],
      });

    }

    // Aquest mètode s'executa quan es fa clic al botó de guardar
    addEditEvent() {

      // Casos d'ús per a afegir o editar un event
          // const nom = this.form.get('name')?.value;
          // const nom = this.form.value.name;
          // console.log(nom);

      if (this.form.invalid) {
        return;
      }

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
