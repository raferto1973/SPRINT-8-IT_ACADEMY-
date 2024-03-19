
// calendar-dialog.component.ts


import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-edit-event-dialog',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatCheckboxModule],
  templateUrl: './calendar-dialog.component.html',
  styleUrls: ['./calendar-dialog.component.scss']
})
export class EditEventDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<EditEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { event: any }
  ) {}

  ngOnInit(): void {
    // Convertir las fechas a formato adecuado para datetime-local al iniciar
    this.data.event.start = this.convertDateToDateTimeLocal(this.data.event.start);
    this.data.event.end = this.convertDateToDateTimeLocal(this.data.event.end);
  }

  convertDateToDateTimeLocal(dateString: string): string {
    const date = new Date(dateString);
    const ten = (i: number) => (i < 10 ? '0' : '') + i;
    const YYYY = date.getFullYear();
    const MM = ten(date.getMonth() + 1);
    const DD = ten(date.getDate());
    const HH = ten(date.getHours());
    const mm = ten(date.getMinutes());
    return `${YYYY}-${MM}-${DD}T${HH}:${mm}`;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  // En EditEventDialogComponent
onSaveClick(): void {
  if (!this.data.event.title || !this.data.event.start || !this.data.event.end) {
    // Mostrar algún mensaje de error
    return;
  }
  // No necesitas manejar directamente la creación o actualización aquí
  // Solo cierra el diálogo y pasa los datos actualizados
  this.dialogRef.close(this.data);
}


}
