

import { AfterViewInit, Component } from '@angular/core';
import  mapboxgl from 'mapbox-gl';


(mapboxgl as any).accessToken = 'pk.eyJ1IjoicmFmZXJ0byIsImEiOiJjbHRyanhyMXcwZzhkMm5vYTU4NHF6eWd2In0.j8eR68QXjwhLxD2aSRP6Mg';


@Component({
  selector: 'app-full-screen-page',
  standalone: true,
  imports: [],
  templateUrl: './full-screen-page.component.html',
  styleUrl: './full-screen-page.component.scss'
})
export class FullScreenPageComponent implements AfterViewInit{

  constructor() { }


  ngAfterViewInit(): void {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.0066, 40.7135],
      zoom: 15.5
    });

    map.on('load', () => {
      map.resize();
    });
  }


}


