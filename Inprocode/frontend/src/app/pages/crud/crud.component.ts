
//crud.component.ts

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



import { User } from '../../interfaces/user';


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
];


@Component({
  selector: 'app-usersCrud',
  standalone: true,
  imports: [ CommonModule, MatCardModule, MatTableModule, MatPaginatorModule, MatFormField, MatLabel, MatInputModule, MatSortModule, MatIconModule, MatTooltipModule ],
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.scss',
})
export class CrudComponent implements AfterViewInit{

  displayedColumns: string[] = ['name', 'surname', 'email', 'age', 'distance', 'activityDate', 'location', 'actions'];
  dataSource: MatTableDataSource<User>;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.dataSource = new MatTableDataSource(users);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator._intl.itemsPerPageLabel = 'Elements per pàgina:';
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }




}
