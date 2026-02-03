import { HttpClient } from '@angular/common/http';
import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, Observer, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

export interface LocationCoordinates {
  latitude: number;
  longitude: number;
}

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  getCurrentPosition(): Observable<LocationCoordinates> {
    return new Observable((observer: Observer<LocationCoordinates>) => {
      if (!isPlatformBrowser(this.platformId)) {
        observer.error(new Error('Geolocation is not available on the server.'));
        return;
      }

      if (!navigator.geolocation) {
        observer.error(new Error('Geolocation is not supported by this browser.'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          observer.complete();
        },
        (error) => {
          let errorMessage = 'An unknown error occurred.';
          switch (error.code) {
            case error.PERMISSION_DENIED:
              if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
                 errorMessage = 'Geolocation requires a secure connection (HTTPS). It is blocked on this device because you are using HTTP.';
              } else {
                 errorMessage = 'User denied the request for Geolocation.';
              }
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location information is unavailable.';
              break;
            case error.TIMEOUT:
              errorMessage = 'The request to get user location timed out.';
              break;
          }
          observer.error(new Error(errorMessage));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    });
  }

  reverseGeocode(lat: number, lng: number): Observable<string> {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;
    return this.http.get<any>(url).pipe(
      map(response => {
        if (response.address) {
          const addr = response.address;
          const part1 = addr.road || addr.pedestrian || addr.suburb || addr.neighbourhood;
          const part2 = addr.city || addr.town || addr.village || addr.county || addr.state;
          
          if (part1 && part2) {
            return `${part1}, ${part2}`;
          } else if (part2) {
            return part2; 
          }
        }
        return (response.display_name || 'Unknown Location').split(',').slice(0, 3).join(',');
      }),
      catchError(error => {
        console.error('Reverse geocoding failed', error);
        return throwError(() => new Error('Failed to retrieve address.'));
      })
    );
  }
}
