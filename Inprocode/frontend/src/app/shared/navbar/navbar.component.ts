
// Navbar.component.ts

import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private router: Router) {}



  //mètode per seleccionar el component
  selectComponent(route: string) {
    this.router.navigate([route]);
  }
}
