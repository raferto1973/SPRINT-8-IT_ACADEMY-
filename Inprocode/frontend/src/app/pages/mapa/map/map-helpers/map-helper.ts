

// map.helper.ts

import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../../../../environments/environment';



// Función para crear un mapa
export function createMap(containerId: string, token: string): mapboxgl.Map {


    const map = new mapboxgl.Map({

      container: containerId,
        style: 'mapbox://styles/mapbox/standard',
        center: [2.2896, 41.5999],
        zoom: 12,
        accessToken: environment.mapbox_key

    });

    return map;
}



