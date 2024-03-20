
//mapa.component.ts


import { Component } from '@angular/core';

import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { MapComponent } from './map/map.component';



@Component({
    selector: 'app-mapa',
    standalone: true,
    templateUrl: './mapa.component.html',
    styleUrl: './mapa.component.scss',
    imports: [ RouterModule, RouterOutlet, MapComponent ]
})


export class MapaComponent {

}
