import { inject, Injectable, signal } from '@angular/core';

import { Place } from './place.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError,tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {

  host:string="http://localhost:3000";

  private httpClient=inject(HttpClient);

  private userPlaces = signal<Place[]>([]);

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces(url:string,errormessage:string) {
    console.log(url);
    return this.fetchPlaces(url,errormessage);
  }

  loadUserPlaces(url:string,errormessage:string) {
    return this.fetchPlaces(url,errormessage).pipe(
    tap({
      next:(res)=>this.userPlaces.set(res)
    })      
    );
  }

  addPlaceToUserPlaces(url:string,place: Place) {

    console.log(this.userPlaces())
    
    const isDuplicate=this.userPlaces().some((obj)=>obj.id===place.id)
    if(isDuplicate){
      console.log("Duplicate")
      return;
    }
    const prev=this.userPlaces();
    this.httpClient.put<{userPlaces:Place}>(url,{placeId:place.id}).subscribe({
      next:(res)=>{
        console.log(res.userPlaces)
        this.userPlaces.set([...prev,place]);
      }
    });

  }

  removeUserPlace(place: Place) {}

  private fetchPlaces(url:string,errormessage:string){
    return this.httpClient.get<{places:Place[]}>(url).
    pipe(map((res)=>res.places),
    catchError((err)=>{
      console.log(err);
      return throwError(()=>new Error(errormessage))
    })); 
   }
}
