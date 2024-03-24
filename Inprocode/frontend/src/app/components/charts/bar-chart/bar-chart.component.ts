
// barChart.component.ts



import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../../../services/activity.service';

import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexPlotOptions, ApexStroke, ApexTooltip, ApexXAxis, ApexYAxis, NgApexchartsModule } from 'ng-apexcharts';

import { Activity } from '../../../models/activity.model';


// Opcions del gràfic
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
};


@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})

// Component del gràfic de barres
export class BarChartComponent implements OnInit {
  public chartOptions!: ChartOptions;

  constructor(private activityService: ActivityService) {}

  // Inicialitza les dades del gràfic
  ngOnInit() {
    this.activityService.getActivities().subscribe((activities) => {
      this.processData(activities);
    });
  }

  // Processa les dades per a mostrar-les en el gràfic
  private processData(activities: Activity[]) {
    // Inicialitza un acumulador per a cada mes de l'any
    const distancePerMonth = Array.from({length: 12}, () => 0); // Crea un array de 12 elements, tots a 0

    activities.forEach(activity => {
      const month = new Date(activity.activityDate).getMonth(); // Obté el mes com a número de 0 a 11
      distancePerMonth[month] += activity.distance; // Suma la distància al mes corresponent
    });

    // Genera les categories (mesos) en format de text
    const categories = distancePerMonth.map((_, index) =>
      new Date(0, index).toLocaleString('ca', { month: 'long' })
    );

    // Configura les opcions del gràfic
    this.chartOptions = {
      series: [{
        name: 'Distància',
        data: distancePerMonth
      }],
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: categories,
      },
      yaxis: {
        title: {
          text: 'Distància (km)',
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + " km";
          },
        },
      },
    };
  }
}

