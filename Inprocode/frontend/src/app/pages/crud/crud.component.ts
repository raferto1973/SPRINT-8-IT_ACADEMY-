
//crud.component.ts

// Aquest component és el que es mostra a la pàgina de CRUD on es llisten els usuaris i es poden afegir, editar o eliminar

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatCardModule} from '@angular/material/card';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatSortModule,  MatSort} from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { FormCrudComponent } from '../../components/form-crud/form-crud.component';

import { User } from '../../interfaces/user';


// Aquesta és la llista d'usuaris que es mostren a la taula
const users: User[] = [

  { name:"Rafa", surname:"Fernandez", email:"rafa@rafa.com", age:50, distance:32, activityDate: new Date(), location: "Canovelles",
  },
  { name:"Marta", surname:"Rodriguez", email:"marta@marta.com", age:47, distance:23, activityDate: new Date(), location: "Granollers",
  },
  { name:"Alex", surname:"Fernandez", email:"alex@alex.com", age:18, distance:60, activityDate: new Date(), location: "La Garriga",
  },
  { name:"Laia", surname:"Rodriguez", email:"laia@laia.com", age:22, distance:18, activityDate: new Date(), location: "Barcelona",
  },
  { name:"Isa", surname:"Llombart", email:"isa@isa.com", age:37, distance:30, activityDate: new Date(), location: "Barcelona",
  },
  { name:"Ines", surname:"Corrales", email:"ines@ines.com", age:29, distance:12, activityDate: new Date(), location: "Premià de Mar",
  },
  { name:"Pere", surname:"Solvella", email:"pere@pere.com", age:70, distance:6, activityDate: new Date(), location: "Vilassar de Mar",
  },
  { name:"Toni", surname:"Prats", email:"toni@toni.com", age:15, distance:60, activityDate: new Date(), location: "La Garriga",
  },
  { name:"Mari", surname:"García", email:"mari@mari.com", age:55, distance:26, activityDate: new Date(), location: "Cardedeu",
  },
  { name:"Susan", surname:"Puig", email:"susan@susan.com", age:63, distance:35, activityDate: new Date(), location: "La Roca del Vallès",
  },
  { name:"Jenny", surname:"Galera", email:"jenny@jennypere.com", age:26, distance:11, activityDate: new Date(), location: "El Masnou",
  },
  { name:"Esther", surname:"Exposito", email:"esther@esther.com", age:45, distance:7, activityDate: new Date(), location: "Mataró",
  },
];


@Component({
  selector: 'app-usersCrud',
  standalone: true,
  imports: [ CommonModule, MatCardModule, MatTableModule, MatPaginatorModule, MatFormField, MatLabel, MatInputModule, MatSortModule, MatIconModule, MatTooltipModule, MatButtonModule, FormCrudComponent ],
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.scss',
})


export class CrudComponent implements AfterViewInit{

  // Aquestes són les columnes que es mostren a la taula
  displayedColumns: string[] = ['name', 'surname', 'email', 'age', 'distance', 'activityDate', 'location', 'actions'];

  // Aquesta és la llista d'usuaris que es mostren a la taula
  dataSource: MatTableDataSource<User>;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(users);
  }

  // Paginador i ordenació de la taula
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator._intl.itemsPerPageLabel = 'Elements per pàgina:';
    this.dataSource.sort = this.sort;
  }

  // Aquest mètode s'executa quan es fa clic al botó de filtrar
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Aquest mètode s'executa quan es fa clic al botó d'afegir
  addEditEvent() {
    const dialogRef = this.dialog.open(FormCrudComponent, {
      width: '550px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  };



}
