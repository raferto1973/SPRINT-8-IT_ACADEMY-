

// map.component.ts

import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { createMap } from './map-helpers/map-helper';
import { LocationService } from '../../../services/location.service';
import { Location } from '../../../models/location.model';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LocationDialogComponent } from './location-dialog/location-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';



@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [],
})


export class MapComponent implements OnInit {

  // Afegim propietat map de tipus mapboxgl.Map
  map!: mapboxgl.Map;

  selectedCategory: string = 'all';
  categories: string[] = ['Restaurants', 'Bancs', 'Bencineres', 'Botigues']; // categorías

  // Array de marcadors amb la seva ubicació associada
  markers: { marker: mapboxgl.Marker, location: Location }[] = [];


  constructor(
    private locationService: LocationService,
    private dialog: MatDialog
  ) {}


  ngOnInit(): void {
    this.map = createMap('map', environment.mapbox_key);
    this.map.on('click', this.addMarker.bind(this));
    this.map.on('load', () => {
      this.loadLocations();
    });
  }

  // Añadir un nuevo marcador al hacer clic en el mapa
  addMarker(e: mapboxgl.MapMouseEvent): void {
    const coordinates: [number, number] = [e.lngLat.lng, e.lngLat.lat]; // Usando destructuración para tupla

    // Crear un marcador a la posición clicada
    const newMarker = new mapboxgl.Marker({ draggable: true }) // Asumiendo que quieres que sea arrastrable desde el principio
      .setLngLat(coordinates)
      .addTo(this.map);

    // Añade el marcador al array 'markers' con un objeto 'location' temporal
    this.markers.push({
      marker: newMarker,
      location: {
        // Puedes dejar estos campos vacíos o establecer valores predeterminados
        name: '',
        latitude: coordinates[1],
        longitude: coordinates[0],
        category: '',
      }
    });

    // Abre el diálogo para que el usuario pueda editar los detalles del marcador
    this.openLocationDialog(newMarker);
  }


  // Obrir el formulari de diàleg per a afegir una localització
  openLocationDialog(marker: mapboxgl.Marker): void {
    const dialogRef = this.dialog.open(LocationDialogComponent, {
      width: '300px',
      data: {
        lat: marker.getLngLat().lat,
        lng: marker.getLngLat().lng,
        categories: this.categories,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Encuentra el objeto asociado al marcador en el array 'markers'
        const markerObject = this.markers.find(m => m.marker === marker);

        if (markerObject) {
          // Actualiza el objeto 'location' con los nuevos valores
          markerObject.location = {
            name: result.name,
            latitude: result.lat,
            longitude: result.lng,
            category: result.category,
          };

          // Guarda la ubicación actualizada en la base de datos
          this.locationService.saveLocation(markerObject.location).subscribe({
            next: (response) => {
              console.log("Marcador guardado con éxito", response);
            },
            error: (error) => {
              console.error("Error al guardar el marcador:", error);
            }
          });
        }
      }
    });
  }


  // Aquest mètode carrega les ubicacions des de la base de dades i les mostra al mapa
  loadLocations(): void {
    this.locationService.getAllLocations().subscribe({
      next: (locations) => {
        // Vaciamos el array de marcadores para evitar duplicados
        this.markers = [];
        locations.forEach((location) => {
          const marker = new mapboxgl.Marker()
            .setLngLat([location.longitude, location.latitude])
            .addTo(this.map);
          marker.getElement().addEventListener('click', () => {
            this.openLocationDialog(marker);
          });

          // Almacenamos tanto el marcador como la ubicación
          this.markers.push({ marker, location });
        });
      },
      error: (error) => {
        console.error('Error al cargar las ubicaciones:', error);
      },
    });
  }


  filterMarkers(): void {
    // Removemos todos los marcadores actuales del mapa
    this.markers.forEach(({ marker }) => marker.remove());

    // Filtramos las ubicaciones basadas en la categoría seleccionada y las agregamos de nuevo
    const filteredMarkers = this.selectedCategory === 'all'
      ? this.markers
      : this.markers.filter(({ location }) => location.category === this.selectedCategory);

    // Agregamos los marcadores filtrados al mapa
    filteredMarkers.forEach(({ marker, location }) => {
      marker.setLngLat([location.longitude, location.latitude]).addTo(this.map);
    });
  }
}

