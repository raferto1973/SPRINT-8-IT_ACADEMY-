

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
  imports: [ CommonModule, FormsModule ],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: []
})
export class MapComponent implements OnInit {
  map!: mapboxgl.Map;
  selectedCategory: string = 'all';
  categories: string[] = ['Restaurants', 'Bancs', 'Bencineres', 'Botigues']; // categorías
  markers: mapboxgl.Marker[] = []; // Almacenará todos los marcadores

  constructor(private locationService: LocationService, private dialog: MatDialog ) {}

  ngOnInit(): void {
    this.map = createMap('map', environment.mapbox_key);
    this.map.on('click', this.addMarker.bind(this));
    this.map.on('load', () => {
      this.loadLocations();
    });
  }

 // Añadir un nuevo marcador al hacer clic en el mapa
 addMarker(e: mapboxgl.MapMouseEvent): void {
  const coordinates: number[] = [e.lngLat.lng, e.lngLat.lat]; // Use e.lngLat.lng and e.lngLat.lat instead of lng and lat
  const lngLatLike: [number, number] = [coordinates[0], coordinates[1]]; // Hacemos cast a tupla

  const newMarker = new mapboxgl.Marker()
    .setLngLat(lngLatLike)
    .addTo(this.map);

  newMarker.getElement().addEventListener('click', () => {
    this.openLocationDialog(newMarker);
  });

  this.markers.push(newMarker); // Añade el marcador al array para manejarlos después
}

// Abrir el diálogo para editar la información del marcador
openLocationDialog(marker: mapboxgl.Marker): void {
  const dialogRef = this.dialog.open(LocationDialogComponent, {
    width: '250px',
    data: { // Aquí pasas los datos que necesitas en tu diálogo, como las coordenadas
      lat: marker.getLngLat().lat,
      lng: marker.getLngLat().lng,
      // Más datos si son necesarios...
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result.event === 'Guardar') {
      // Guardar la ubicación utilizando el servicio
      this.locationService.saveLocation({
        name: result.data.name, // Este es el nombre que el usuario escribió en el diálogo
        latitude: result.data.lat,
        longitude: result.data.lng,
        category: result.data.category // Esta es la categoría seleccionada en el diálogo
        // Más datos si son necesarios...
      }).subscribe((savedLocation) => {
        // Actualiza el marcador con el ID de la ubicación guardada si es necesario
        // Por ejemplo, podrías guardar el ID como una propiedad personalizada del marcador
      });
    } else if (result.event === 'Eliminar') {
      // Eliminar la ubicación utilizando el servicio
      this.locationService.deleteLocation(result.data.id).subscribe(() => {
        // Elimina el marcador del mapa y del array de marcadores
        marker.remove();
        this.markers = this.markers.filter(m => m !== marker);
      });
    }
  });
}

  loadLocations(): void {
    // Aquí deberías cargar las ubicaciones de tu backend y añadirlas como marcadores
    // Similar a cómo añadimos un marcador en addMarker()
  }

  filterMarkers(): void {
    // Lógica para filtrar marcadores basado en la categoría seleccionada
    // Esto requerirá que cada marcador tenga asociada una categoría
  }
}
