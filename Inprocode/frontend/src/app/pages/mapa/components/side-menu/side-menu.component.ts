

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface MenuItem {
  name:  string;
  route: string;
}

@Component({
  selector: 'maps-side-menu',
  standalone: true,
  imports: [ CommonModule, RouterModule ],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss'
})


export class SideMenuComponent {

  // Rutes per a cada item del menú
  public menuItems: MenuItem[] = [
    { route: '/mapa/fullscreen',  name: 'Full-screen' },
    { route: '/mapa/zoom-range',  name: 'Zoom-Range' },
    { route: '/mapa/markers',     name: 'Markers' },
    { route: '/mapa/properties',  name: 'Houses' },

  ];

}
