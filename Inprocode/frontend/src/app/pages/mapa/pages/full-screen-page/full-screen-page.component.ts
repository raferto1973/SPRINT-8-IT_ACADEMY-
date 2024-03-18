
// full-screen-page.component.ts


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

  public zoom: number = 10;                                       // Zoom inicial del mapa
  public map?: mapboxgl.Map;                                      // Mapa
  public currentlngLat: LngLat = new LngLat(2.2896, 41.5999);     // Coordenades inicials del mapa
  public markers: MarkerAndColor[] = [];                          // Array de marcadors


  // Aquest mètode carregarà el mapa un cop s'hagi carregat la vista
  ngAfterViewInit(): void {
    this.map = new mapboxgl.Map({
      container: 'map',                                           // container ID
      style: 'mapbox://styles/mapbox/streets-v11',                // style URL
      center: this.currentlngLat,                                 // starting position [lng, lat]
      zoom: this.zoom,                                            // starting zoom
    });

    // Afegim controls de zoom
    this.mapListeners();

    // Afegim el marcador al local storage
    this.saveFromLocalStorage();

    // Afegim un marcador al mapa
    const marker = new Marker({
      color: "red",
      draggable: true
    })
      .setLngLat(this.currentlngLat)
      .addTo(this.map);
  }

  // Mètode per fer zoom in
  zoomIn() {
      this.map!.zoomIn();
  }

  // Mètode per fer zoom out
  zoomOut() {
    this.map!.zoomOut();
  }

  // Mètode per canviar el zoom
  zoomChanged(value: string) {
    this.zoom = Number(value);
    this.map!.zoomTo( this.zoom );
  }

  // Mètode per moure el mapa a la posició del marcador
  flyto( marker: Marker) {
    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat(),
    });
  }

  // Mètode per reiniciar el mapa
  ngOnDestroy(): void {
    this.map?.remove
  }

  //Listeners del mapa. Aquest mètode s'encarrega de controlar els events del mapa
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


  // Mètode per afegir un marcador al mapa
  createMarker() {
    if (!this.map) return;

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const LngLat = this.map.getCenter();

    this.addMarker( LngLat, color );
  }

  // Mètode per afegir un marcador al mapa
  addMarker( LngLat: LngLat, color: string) {
    if (!this.map) return;

    // Creem el marcador
    const marker = new Marker({
      color: color,
      draggable: true
    })
      .setLngLat(LngLat)
      .addTo(this.map);

    // Afegim el marcador al array de marcadors
    this.markers.push({ marker, color });

    // Guardem el marcador al local storage
    this.saveToLocalStorage();

    // Afegim un event listener al marcador
    marker.on('dragend', () => {
      this.saveToLocalStorage();
    });

  }

  // Mètode per eliminar un marcador del mapa
  removeMarker(index: number) {
    this.markers[index].marker.remove();
    this.markers.splice(index, 1);
  }


  // Mètode per guardar els marcadors al local storage
  saveToLocalStorage() {
    const plainMarkers: PLainMarker[] = this.markers.map(({ color, marker}) => {
      return {
        color,
        lngLat: marker.getLngLat().toArray()
      }
    });

    localStorage.setItem('plainMarkers', JSON.stringify(plainMarkers));

  }

  // Mètode per carregar els marcadors del local storage
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

