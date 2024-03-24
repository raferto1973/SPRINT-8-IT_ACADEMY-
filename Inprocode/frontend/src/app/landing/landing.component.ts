
// landing.component.


import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';


import { NavbarComponent } from '../shared/navbar/navbar.component';
import { FooterComponent } from "../shared/footer/footer.component";
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-landing',
    standalone: true,
    templateUrl: './landing.component.html',
    styleUrl: './landing.component.scss',
    imports: [NavbarComponent,  RouterOutlet, RouterModule, FooterComponent, HttpClientModule]
})

export class LandingComponent {

}
