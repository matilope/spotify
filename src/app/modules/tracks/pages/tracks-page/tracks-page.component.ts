import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.models';
import { TrackService } from '@modules/tracks/services/track.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.css']
})
export class TracksPageComponent implements OnInit, OnDestroy {

  public tracksRandom!: Array<TrackModel>;
  public tracksTrending!: Array<TrackModel>;

  /* public observer1$!: Subscription; 
  public observer2$!: Subscription; */

  constructor(private _trackService: TrackService){
  }

  ngOnInit(): void {
    /* this.observer1$ = this._trackService.dataTracksTrending$.subscribe({
      next: (response) => {
        this.tracksTrending = response;
        this.tracksRandom = response;
      }
    })

    this.observer2$ = this._trackService.dataTracksTrending$.subscribe({
      next: (response) => {
        this.tracksRandom = [...this.tracksRandom, ...response];
      }
    }) */

    this.loadDataAllPromise();
    this.loadDataRandom();
  }

  async loadDataAllPromise(): Promise<any> {
    this.tracksTrending = await this._trackService.getAllTracks$().toPromise();
    /*.subscribe({
      next: (response: TrackModel[]) => {
        this.tracksTrending = response;
      }
    });
    */
   // Manejando los observables como una promesa
  }

/*
  loadDataAll(): void {
    this._trackService.getAllTracks$()
    .subscribe({
      next: (response: TrackModel[]) => {
        this.tracksTrending = response;
      }
    });
  }
*/

  loadDataRandom(): void {
    this._trackService.getAllRandom$().subscribe({
      next: (response: TrackModel[]) => {
        this.tracksRandom = response;
      }
    });
  }

  ngOnDestroy(): void {
  /*   [this.observer1$, this.observer2$].forEach(obs => obs.unsubscribe()); */
  /* NO ES NECESARIO DESUSCRIBIRSE CUANDO SE HACEN PETICIONES HTTP, YA QUE ANGULAR LO SABE Y TE DESUSCRIBE CUANDO SE DESTRUYE EL COMPONENTE */
  }
}
