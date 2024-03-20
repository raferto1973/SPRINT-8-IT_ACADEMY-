


import { Component, OnInit } from '@angular/core';
import { createMap } from './map-helpers/map-helper';
import { LocationService } from '../../../services/location.service';
import { Location } from '../../../models/location.model';
import { environment } from '../../../../environments/environment';



@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
  providers: []
})


export class MapComponent implements OnInit {
  constructor(private locationService: LocationService) {}

  ngOnInit(): void {
    const map = createMap('map', environment.mapbox_key);

    
  }
}

