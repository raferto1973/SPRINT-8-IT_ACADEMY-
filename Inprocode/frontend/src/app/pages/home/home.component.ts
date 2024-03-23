import { Component } from '@angular/core';
import { CrudComponent } from "../crud/crud.component";
import { PieChartComponent } from '../../components/charts/pie-chart/pie-chart.component';
import { BarChartComponent } from '../../components/charts/bar-chart/bar-chart.component';
import { MapaComponent } from '../mapa/mapa.component';
import { MapComponent } from '../mapa/map/map.component';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [CrudComponent, MapComponent, BarChartComponent, PieChartComponent ]
})
export class HomeComponent {

}
