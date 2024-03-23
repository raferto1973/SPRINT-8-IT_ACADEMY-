


import { Component, OnInit } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexLegend, ApexStroke, ApexTitleSubtitle, ApexXAxis, ApexYAxis, NgApexchartsModule } from "ng-apexcharts";
import { series } from '../../../pages/chart/datos-ejemplo';


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  labels: string[];
  legend: ApexLegend;
  subtitle: ApexTitleSubtitle;
};


@Component({
  selector: 'app-area-chart',
  standalone: true,
  imports: [ NgApexchartsModule ],
  templateUrl: './area-chart.component.html',
  styleUrl: './area-chart.component.scss'
})
export class AreaChartComponent implements OnInit{

  public chartOptions!: ChartOptions;


  constructor() { }

  ngOnInit(): void {

    this.chartOptions = {
      series: [
        {
          name: "STOCK ABC",
          data: series.monthDataSeries1.prices
        }
      ],
      chart: {
        type: "area",
        height: 350,
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },

      title: {
        text: "Fundamental Analysis of Stocks",
        align: "left"
      },
      subtitle: {
        text: "Price Movements",
        align: "left"
      },
      labels: series.monthDataSeries1.dates,
      xaxis: {
        type: "datetime"
      },
      yaxis: {
        opposite: true
      },
      legend: {
        horizontalAlign: "left"
      }
    };

  }

}
