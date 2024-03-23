

// pie-chart.component.ts

import { Component, OnInit } from '@angular/core';
import { ApexChart, ApexNonAxisChartSeries, ApexResponsive, NgApexchartsModule } from 'ng-apexcharts';
import { ActivityService } from '../../../services/activity.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};


@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [ NgApexchartsModule ],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})


export class PieChartComponent implements OnInit {

  // Declarem la variable chartOptions amb el tipus ChartOptions
  public chartOptions!: ChartOptions;

  // Inicialitzem el servei ActivityService
  constructor(private activityService: ActivityService) {}

  // En el mètode ngOnInit cridem al mètode getActivities del servei ActivityService
  ngOnInit() {
    this.activityService.getActivities().subscribe((activities: any[]) => {
      this.updateChartData(activities);
    });
  }

  // Mètode updateChartData que rep un array d'activitats i retorna un objecte amb les dades per a la gràfica
  private updateChartData(activities: any[]) {
    // Creem un objecte locationCount que contindrà la quantitat d'activitats per localització
    const locationCount = activities.reduce((acc, activity) => {
      const location = activity.location;
      // Si no existeix la clau location la inicialitzem a 0 i li sumem 1
      acc[location] = (acc[location] || 0) + 1;
      return acc;
    }, {});

    this.chartOptions = {
      // Assignem a la propietat series un array amb els valors de locationCount
      series: Object.values(locationCount),
      chart: {
        width: 380,
        type: 'pie'
      },
      // Assignem a la propietat labels un array amb les claus de locationCount
      labels: Object.keys(locationCount),
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    };
  }
}


