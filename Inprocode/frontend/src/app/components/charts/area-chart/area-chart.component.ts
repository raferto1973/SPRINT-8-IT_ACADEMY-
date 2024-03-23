
// area-chart.component.ts


import { Component, OnInit } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexLegend, ApexStroke, ApexTitleSubtitle, ApexXAxis, ApexYAxis, NgApexchartsModule } from "ng-apexcharts";
import { series } from '../bar-chart/datos-ejemplo';
import { Activity } from '../../../models/activity.model';
import { ActivityService } from '../../../services/activity.service';


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;

  legend: ApexLegend;

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

  constructor(private activityService: ActivityService) { }

  ngOnInit(): void {
    this.activityService.getActivities().subscribe((activities) => {
      this.processData(activities);
    });
  }

  private processData(activities: Activity[]) {
    const ranges = ['0-10', '11-20', '21-30', '31-40', '41-50', '51-60', '61+'];

    // Agrupa les distàncies per franja d'edat
    const distanceByAgeRange: {[range: string]: number} = {};

     // Inicialitza l'objecte amb totes les franges d'edat per assegurar l'ordre
    ranges.forEach(range => distanceByAgeRange[range] = 0);

    // Omple l'objecte amb les distàncies totals per franja d'edat
    activities.forEach(activity => {
      const range = this.getAgeRange(activity.age);
      distanceByAgeRange[range] += activity.distance;
    });

    // Converteix les dades agrupades en format adequat per al gràfic
    const seriesData = Object.keys(distanceByAgeRange).map(range => ({
      x: range,
      y: distanceByAgeRange[range]
    }));

    this.chartOptions = {
      series: [{
        name: "Distància recorrida",
        data: seriesData
      }],
      chart: {
        type: "area",
        height: 350
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      xaxis: {
        type: "category"
      },
      yaxis: {
        opposite: true,
        title: {
          text: "Distància (km)"
        }
      },
      title: {
        text: "Distància recorrida per franja d'edat",
        align: "left"
      },
      legend: {
        horizontalAlign: "left"
      },
    };
  }

  private getAgeRange(age: number): string {
    if (age <= 10) return '0-10';
    if (age <= 20) return '11-20';
    if (age <= 30) return '21-30';
    if (age <= 40) return '31-40';
    if (age <= 50) return '41-50';
    if (age <= 60) return '51-60';
    // Afegeix més franges si és necessari
    return '61+';
  }
}
