import { Component, OnInit, signal,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {

  private httpClient=inject(HttpClient);
  isFetching=signal<boolean>(false);

  host:string="http://localhost:3000/places";
  ngOnInit(): void {
    this.isFetching.set(true);
    this.httpClient.get<{places:Place[]}>(this.host).subscribe({
      next:(res)=>{
        console.log(res.places);
        this.places.set(res.places);
      },
      complete:()=>{
        this.isFetching.set(false);
      }
    });
  }
  
  places = signal<Place[] | undefined>(undefined);


}
