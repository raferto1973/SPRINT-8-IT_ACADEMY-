



import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import  mapboxgl, { LngLat, Marker } from 'mapbox-gl';
import { DecimalPipe, CommonModule } from '@angular/common';



(mapboxgl as any).accessToken = 'pk.eyJ1IjoicmFmZXJ0byIsImEiOiJjbHRyanhyMXcwZzhkMm5vYTU4NHF6eWd2In0.j8eR68QXjwhLxD2aSRP6Mg';


interface MarkerAndColor {
  color: string;
  marker: Marker;
}

interface PLainMarker {
  color: string;
  lngLat: number[];
}

@Component({
    selector: 'app-full-screen-page',
    standalone: true,
    templateUrl: './full-screen-page.component.html',
    styleUrl: './full-screen-page.component.scss',
    imports: [ DecimalPipe, CommonModule]
})
export class FullScreenPageComponent implements AfterViewInit, OnDestroy {

  @ViewChild('map') divMap?: ElementRef;

  public zoom: number = 10;
  public map?: mapboxgl.Map;
  public currentlngLat: LngLat = new LngLat(2.2896, 41.5999);
  public markers: MarkerAndColor[] = [];

  ngAfterViewInit(): void {


    this.map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v11',  // style URL
      center: this.currentlngLat,  // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    this.mapListeners();

    this.saveFromLocalStorage();

    const marker = new Marker({
      color: "red",
      draggable: true
    })
      .setLngLat(this.currentlngLat)
      .addTo(this.map);

  }

  ngOnDestroy(): void {
    this.map?.remove
  }

  mapListeners() {
    if (!this.map) throw new Error('Map is not defined');

    this.map.on('zoom', (ev) => {
      this.zoom = this.map!.getZoom();
    });

    this.map.on('zoomend', (ev) => {
      if (this.zoom < 18) return;
      this.map!.setZoom(18);
    });

    this.map.on('move', () => {
      this.currentlngLat = this.map!.getCenter();
      const { lng, lat } = this.currentlngLat;

    });
  }

  zoomIn() {
    this.map!.zoomIn();
  }

  zoomOut() {
    this.map!.zoomOut();
  }

  zoomChanged(value: string) {
    this.zoom = Number(value);
    this.map!.zoomTo( this.zoom );
  }

  createMarker() {
    if (!this.map) return;

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const LngLat = this.map.getCenter();

    this.addMarker( LngLat, color );
  }

  addMarker( LngLat: LngLat, color: string) {
    if (!this.map) return;

    const marker = new Marker({
      color: color,
      draggable: true
    })
      .setLngLat(LngLat)
      .addTo(this.map);

    this.markers.push({ marker, color });
    this.saveToLocalStorage();

    marker.on('dragend', () => {
      this.saveToLocalStorage();
    });

  }

  removeMarker(index: number) {
    this.markers[index].marker.remove();
    this.markers.splice(index, 1);
  }

  flyto( marker: Marker) {
    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat(),
    });
  }

  saveToLocalStorage() {
    const plainMarkers: PLainMarker[] = this.markers.map(({ color, marker}) => {
      return {
        color,
        lngLat: marker.getLngLat().toArray()
      }
    });

    localStorage.setItem('plainMarkers', JSON.stringify(plainMarkers));

  }

  saveFromLocalStorage() {
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkers: PLainMarker[] = JSON.parse( plainMarkersString );

    plainMarkers.forEach ( ({ color, lngLat }) => {
      const [ lng, Lat ] = lngLat;
      const coords = new LngLat( lng, Lat )

      this.addMarker( coords, color);
    })

  }

}

