

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
import { FullScreenPageComponent } from './pages/mapa/pages/full-screen-page/full-screen-page.component';
import { MarkersPageComponent } from './pages/mapa/pages/markers-page/markers-page.component';
import { PropertiesPageComponent } from './pages/mapa/pages/properties-page/properties-page.component';
import { ZoomRagePageComponent } from './pages/mapa/pages/zoom-rage-page/zoom-rage-page.component';


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
    children: [
      { path: 'full-screen', component: FullScreenPageComponent },
      { path: 'markers', component: MarkersPageComponent },
      { path: 'properties', component: PropertiesPageComponent },
      { path: 'zoom-rage', component: ZoomRagePageComponent },
      { path: '', redirectTo: 'full-screen', pathMatch: 'full' },
    ]
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
