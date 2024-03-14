
//mapa.component.ts


import { Component } from '@angular/core';

import { FullScreenPageComponent } from './pages/full-screen-page/full-screen-page.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';


@Component({
    selector: 'app-mapa',
    standalone: true,
    templateUrl: './mapa.component.html',
    styleUrl: './mapa.component.scss',
    imports: [FullScreenPageComponent, SideMenuComponent]
})



export class MapaComponent {

}
