

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
import { Dialog } from '@angular/cdk/dialog';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [],
})
export class MapComponent implements OnInit {
  map!: mapboxgl.Map;
  selectedCategory: string = 'all';
  categories: string[] = ['Restaurants', 'Bancs', 'Bencineres', 'Botigues']; // categorías
  markers: mapboxgl.Marker[] = []; // Almacenará todos los marcadores

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
    // Usa e.lngLat.lng i e.lngLat.lat en comptes de lng i lat
    const coordinates: number[] = [e.lngLat.lng, e.lngLat.lat];

    // Converteix a tupla per a evitar errors de tipus
    const lngLatLike: [number, number] = [coordinates[0], coordinates[1]]; // Hacemos cast a tupla

    // Crea un marcador a la posició clicada
    const newMarker = new mapboxgl.Marker()
      .setLngLat(lngLatLike)
      .addTo(this.map);

    // Obre el diàleg de localització
    this.openLocationDialog(newMarker);

    // Afegeix un event listener al marcador per a obrir el diàleg
    newMarker.getElement().addEventListener('click', () => {
      this.openLocationDialog(newMarker);
    });

    // Afegeix el marcador a l'array per a gestionar-los després
    this.markers.push(newMarker);
  }

  // Abrir el diálogo para editar la información del marcador
  openLocationDialog(marker: mapboxgl.Marker): void {
    const dialogRef = this.dialog.open(LocationDialogComponent, {
      width: '250px',
      data: {
        lat: marker.getLngLat().lat,
        lng: marker.getLngLat().lng,
        categories: this.categories,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Transforma el resultado para que coincida con la estructura de la base de datos si es necesario
        const newLocation: Location = {
          name: result.name,
          latitude: result.lat, // Asegúrate de que esto es un número
          longitude: result.lng, // Asegúrate de que esto es un número
          category: result.category
        };

        this.locationService.saveLocation(newLocation).subscribe({
          next: (response) => {
            console.log("Marcador guardado con éxito", response);
            // Agrega el marcador al mapa si aún no está presente
            const newMarker = new mapboxgl.Marker()
              .setLngLat([newLocation.longitude, newLocation.latitude])
              .addTo(this.map);

            // Agrega lógica aquí si necesitas almacenar el marcador para su posterior uso
            this.markers.push(newMarker);

            // También podrías querer agregar un popup al marcador aquí
            newMarker.getElement().addEventListener('click', () => this.openLocationDialog(newMarker));

          },
          error: (error) => {
            console.error("Error al guardar el marcador:", error);
          }
        });
      }
    });

  }

  // Aquest mètode carrega les ubicacions des de la base de dades i les mostra al mapa
  loadLocations(): void {
    this.locationService.getAllLocations().subscribe({
      next: (locations) => {
        this.markers = locations.map((location) => {
          const marker = new mapboxgl.Marker()
            .setLngLat([location.longitude, location.latitude])
            .addTo(this.map);
          marker.getElement().addEventListener('click', () => {
            this.openLocationDialog(marker);
          });
          console.log(locations);
          return marker;
        });
      },
      error: (error) => {
        console.error('Error al cargar las ubicaciones:', error);
      },
    });
  }

  filterMarkers(): void {
    // Lógica para filtrar marcadores basado en la categoría seleccionada
    // Esto requerirá que cada marcador tenga asociada una categoría
  }
}

