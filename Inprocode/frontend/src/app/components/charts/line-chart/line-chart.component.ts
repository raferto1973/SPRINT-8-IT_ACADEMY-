
// line-chart.component.ts


import { Component, OnInit } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexGrid, ApexStroke, ApexTitleSubtitle, ApexXAxis, NgApexchartsModule } from 'ng-apexcharts';
import { Activity } from '../../../models/activity.model';
import { ActivityService } from '../../../services/activity.service';


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [ NgApexchartsModule],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss'
})


export class LineChartComponent implements OnInit {

  public chartOptions!: ChartOptions;

  constructor(private activityService: ActivityService) {} // Injecta ActivityService

  ngOnInit() {
    this.activityService.getActivities().subscribe((activities) => {
      this.processData(activities);
    });
  }

  private processData(activities: Activity[]) {
    // Inicialitza un objecte per comptar activitats per mes
    const countsPerMonth: {[month: string]: number} = {};

    // Omple l'objecte amb les dades d'activitat
    activities.forEach((activity) => {
      const month = new Date(activity.activityDate).getMonth(); // Obté el mes de la data d'activitat
      countsPerMonth[month] = (countsPerMonth[month] || 0) + 1; // Incrementa el comptador per aquest mes
    });

    // Prepara les dades per al gràfic
    const categories = Object.keys(countsPerMonth).map(month =>
      new Date(0, parseInt(month), 0).toLocaleString('ca', { month: 'long' })
    );
    const data = Object.values(countsPerMonth);

    this.chartOptions = {
      series: [
        {
          name: "Nombre d'activitats",
          data: data
        }
      ],
      chart: {
        height: 350,
        type: "line",
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
        text: "Nombre d'activitats per mes",
        align: "left"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5
        }
      },
      xaxis: {
        categories: categories
      }
    };
  }
}
