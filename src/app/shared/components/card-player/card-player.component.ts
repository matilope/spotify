import { Component, Input, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.models';
import { MultimediaService } from '@shared/services/multimedia-service.service';

@Component({
  selector: 'app-card-player',
  templateUrl: './card-player.component.html',
  styleUrls: ['./card-player.component.css']
})
export class CardPlayerComponent implements OnInit {
  @Input() track: TrackModel = { _id: 0, name: '', album: '', url: '', cover: '' };
  @Input() mode: 'small' | 'big' = 'small';

  constructor(private _multimediaService: MultimediaService) { }

  ngOnInit(): void {

  }

  sendPlay(track: TrackModel): void {
    /*
    this._multimediaService.callback.emit(track);
    */
    this._multimediaService.trackInfo$.next(track);
  }
}
