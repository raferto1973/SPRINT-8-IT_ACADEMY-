

//crud.component.ts

// Aquest component és el que es mostra a la pàgina de CRUD on es llisten els usuaris i es poden afegir, editar o eliminar

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

// Aquestes són les llibreries de Material que s'utilitzen en aquest component
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { FormCrudComponent } from '../../components/form-crud/form-crud.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

// Aquestes són les llibreries pròpies que s'utilitzen en aquest component
import { Activity } from '../../interfaces/activity';
import { ActivityService } from '../../services/activity.service';

@Component({
  selector: 'app-usersCrud',
  standalone: true,
  imports: [ CommonModule, MatCardModule, MatTableModule, MatPaginatorModule, MatFormField, MatLabel, MatInputModule,
    MatSortModule, MatIconModule, MatTooltipModule, MatButtonModule, FormCrudComponent, MatProgressBarModule, MatSnackBarModule ],
  templateUrl: './crud.component.html',
  styleUrl:    './crud.component.scss',
})
export class CrudComponent implements OnInit, AfterViewInit {
  // Aquestes són les columnes que es mostren a la taula
  displayedColumns: string[] = [ 'name', 'surname', 'email', 'age', 'distance', 'activityDate', 'location', 'actions' ];

  // Aquesta variable s'utilitza per mostrar o amagar la barra de progrés
  loading: boolean = false;

  // Aquesta és la llista d'usuaris que es mostren a la taula
  dataSource: MatTableDataSource<Activity>;

  // Aquestes són les variables que s'utilitzen per filtrar i ordenar la taula
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private _activityService: ActivityService,
    private _snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.getActivities();
  }

  // Paginador i ordenació de la taula
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator._intl.itemsPerPageLabel = 'Elements per pàgina:';
    this.dataSource.sort = this.sort;
  }

  getActivities() {
    this.loading = true;
    this._activityService.getActivities().subscribe((data) => {
      this.loading = false;
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.paginator._intl.itemsPerPageLabel =
        'Elements per pàgina:';
      this.dataSource.sort = this.sort;
    });
  }

  // Aquest mètode s'executa quan es fa clic al botó de filtrar
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Aquest mètode s'executa quan es fa clic al botó d'Afegir
  addEditActivity(id?: number) {
    const dialogRef = this.dialog.open(FormCrudComponent, {
      width: '550px',
      disableClose: true,
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getActivities();
      }
    });
  }

  // Aquest mètode s'executa quan es fa clic al botó d'eliminar
  deleteActivity(id: number) {
    this.loading = true;

    this._activityService.deleteActivity(id).subscribe(() => {
      this.loading = false;
      this.getActivities();
      this.exitMessage();
    });
  }

  exitMessage() {
    this._snackBar.open("L'activitat s'ha eliminat amb èxit ", '', {
      duration: 2000,
    });
  }
}
