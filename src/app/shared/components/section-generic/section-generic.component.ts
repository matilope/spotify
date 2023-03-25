import { Component, Input } from '@angular/core';
import { TrackModel } from '@core/models/tracks.models';

@Component({
  selector: 'app-section-generic',
  templateUrl: './section-generic.component.html',
  styleUrls: ['./section-generic.component.css']
})
export class SectionGenericComponent {
  @Input() title!: string;
  @Input() dataTracks!: Array<TrackModel>;
  @Input() mode: 'small' | 'big' = 'big';
}
