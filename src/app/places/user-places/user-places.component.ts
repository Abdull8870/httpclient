import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent implements OnInit {

  host:string="http://localhost:3000";

  private placesService=inject(PlacesService);

  private httpClient=inject(HttpClient);

  places = this.placesService.loadedUserPlaces;


  ngOnInit(): void {

    this.placesService.loadUserPlaces(this.host+'/user-places',"Error While loading the data").
    subscribe({
      error:(err)=>{
        console.log(err);
      }
    });
    
  }


}
