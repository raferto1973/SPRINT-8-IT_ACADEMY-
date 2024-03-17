
//mapa.component.ts


import { Component } from '@angular/core';

import { RouterOutlet, RouterModule, Router } from '@angular/router';

import { FullScreenPageComponent } from './pages/full-screen-page/full-screen-page.component';


@Component({
    selector: 'app-mapa',
    standalone: true,
    templateUrl: './mapa.component.html',
    styleUrl: './mapa.component.scss',
    imports: [ RouterModule, RouterOutlet, FullScreenPageComponent ]
})


export class MapaComponent {

}
