
// app.component.ts


import { Component, computed, effect, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, LandingComponent, HttpClientModule]
})
export class AppComponent {


}
