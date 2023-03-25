import { Pipe, PipeTransform } from '@angular/core';
import { TrackModel } from '@core/models/tracks.models';

@Pipe({
  name: 'orderList'
})
export class OrderListPipe implements PipeTransform {

  transform(value: Array<any>, args: string | null = null, sort: string = 'asc'): Array<TrackModel> {
    try {
      if (args === null) {
        return value;
      }
      
      const list = value.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      
      return sort == 'asc' ? list : list.reverse();

    } catch {
      return value;
    }
  }

}
