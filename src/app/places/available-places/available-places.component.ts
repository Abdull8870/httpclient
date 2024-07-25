import { Component, OnInit, signal,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  private placeService=inject(PlacesService);
  places = signal<Place[] | undefined>(undefined);
  isError=signal('');
  private httpClient=inject(HttpClient);
  isFetching=signal<boolean>(false);

  host:string="http://localhost:3000";
  ngOnInit(): void {
    this.isFetching.set(true);
    this.placeService.
    loadAvailablePlaces(this.host+'/places',"Error While fetching data").
    subscribe({
      next:(res)=>{
        console.log(res);
        this.places.set(res);
      },
      complete:()=>{
        this.isFetching.set(false);
      },
      error:(error)=>{
        console.log(error);
        this.isError.set(error);
      }
    });
  }
  
  onSelectedPlace(selectedPlace:Place){

    this.placeService.addPlaceToUserPlaces(this.host+'/user-places',selectedPlace);

  }

}
