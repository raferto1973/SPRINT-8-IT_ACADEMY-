

// location-dialog.component.ts

import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';




export interface DialogData {
  id?: number; // En caso de que estés editando un marcador existente
  lat: number;
  lng: number;
  name?: string; // Para el nombre del marcador
  category?: string; // Para la categoría del marcador
}

@Component({
  selector: 'app-location-dialog',
  templateUrl: 'location-dialog.component.html',
  styleUrls: ['location-dialog.component.scss'],

  standalone: true,
  imports: [ CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDialogClose,   ],
})
export class LocationDialogComponent {
  categories = ['Categoria1', 'Categoria2', 'Categoria3']; // Ejemplo de categorías

  constructor(
    public dialogRef: MatDialogRef<LocationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

