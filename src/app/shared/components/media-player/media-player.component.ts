import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TrackModel } from '@core/models/tracks.models';
import { MultimediaService } from '@shared/services/multimedia-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent implements OnInit, OnDestroy {
  @ViewChild('progressBar') progressBar: ElementRef = new ElementRef('');
  public observer1$!: Subscription

  public state: string = "paused";

  constructor(public _multimediaService: MultimediaService) { }

  ngOnInit(): void {
    /* this.observer1$ = this._multimediaService.callback.subscribe({
      next: (response: TrackModel) => {
        console.log("Recibiendo canción", response);
      }
    }) */

    /*
    const observer1$ = this._multimediaService.myObservable1$.subscribe({
      next: (response) => {

      },
      error: (error) => {

      },
      complete: () => {

      }
    })
    */

    this.observer1$ = this._multimediaService.playerStatus$.subscribe({
      next: (status) => {
        this.state = status;
      }
    })

    /* this._multimediaService.trackInfo$.subscribe({
      next: (response)=>{

      }
    }) */
  }

  ngOnDestroy(): void {
    this.observer1$.unsubscribe();
  }

  handlePosition(event: MouseEvent): void{
    const {clientX} = event;
    const elNative: HTMLElement = this.progressBar.nativeElement;
    const { x, width } = elNative.getBoundingClientRect();
    const clickX = clientX - x;
    const percentageFromX = (clickX * 100 ) / width;
    this._multimediaService.seekAudio(percentageFromX);
  }
  

}
