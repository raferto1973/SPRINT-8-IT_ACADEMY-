
// barChart.component.ts

import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';



@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [ BaseChartDirective ],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss'
})
export class BarChartComponent {

}
