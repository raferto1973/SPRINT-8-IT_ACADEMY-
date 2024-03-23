

// app.routes.ts

import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';

// Importació del CRUD
import { CrudComponent } from './pages/crud/crud.component';

// Importació dels gràfics
import { ChartsComponent } from './pages/chart/charts.component';

// Importació del calendari
import { CalendarComponent } from './pages/calendar/calendar.component';

// Importació dels mapes
import { MapaComponent } from './pages/mapa/mapa.component';



// Rutes de l'aplicació

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/crud',
    pathMatch: 'full',
  },

  {
    path: 'crud',
    component: CrudComponent,
  },


  {
    path: 'map',
    component: MapaComponent,
  },

  {
    path: 'grafics',
    component: ChartsComponent,
  },

  {
    path: 'calendar',
    component: CalendarComponent,
  },

  {
    path: '**',
    redirectTo: '/crud',
    pathMatch: 'full',
  },
];
