import { Component, Input, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.models';

@Component({
  selector: 'app-play-list-body',
  templateUrl: './play-list-body.component.html',
  styleUrls: ['./play-list-body.component.css']
})
export class PlayListBodyComponent implements OnInit{
  @Input() tracks!: Array<TrackModel>;
  optionProperty: { property: string | null, order: string } = { property: null, order: "asc" }

  ngOnInit(): void {
    this.tracks = [];
  }

  changeSort(property: string): void{
    const { order } = this.optionProperty;
    this.optionProperty = {
      property: property,
      order: order  === 'asc' ? 'desc' : 'asc'
    };
  }
}
