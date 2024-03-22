
// chart.component.ts


import { Component, OnInit } from '@angular/core';
import { BarChartComponent } from '../../components/charts/bar-chart/bar-chart.component';
import { PieChartComponent } from '../../components/charts/pie-chart/pie-chart.component';
import { AreaChartComponent } from '../../components/charts/area-chart/area-chart.component';
import { LineChartComponent } from '../../components/charts/line-chart/line-chart.component';



@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [ BarChartComponent, PieChartComponent, AreaChartComponent, LineChartComponent ],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss'
})


export class ChartsComponent {

  constructor() { }



}
