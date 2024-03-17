

// app.routes.ts

import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';

// Importació del CRUD
import { CrudComponent } from './pages/crud/crud.component';

// Importació dels gràfics
import { ChartComponent } from './pages/chart/chart.component';

// Importació del calendari
import { CalendarComponent } from './pages/calendar/calendar.component';

// Importació dels mapes
import { MapaComponent } from './pages/mapa/mapa.component';



// Rutes de l'aplicació

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },

  {
    path: 'home',
    component: HomeComponent,
  },

  {
    path: 'crud',
    component: CrudComponent,
  },


  // Ruta dels mapes
  {
    path: 'map',
    component: MapaComponent,
  },

  {
    path: 'grafics',
    component: ChartComponent,
  },

  {
    path: 'calendar',
    component: CalendarComponent,
  },

  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];
