

// app.routes.ts

import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { CrudComponent } from './pages/crud/crud.component';
import { MapaComponent } from './pages/mapa/mapa.component';
import { ChartComponent } from './pages/chart/chart.component';
import { CalendarComponent } from './pages/calendar/calendar.component';

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
