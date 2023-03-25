import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, Observable, of, mergeMap, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TrackModel } from '@core/models/tracks.models';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  /*   dataTracksTrending$: Observable<TrackModel[]> = of([]);
    dataTracksRandom$: Observable<TrackModel[]> = of([]);
   */

  private readonly URL: string = environment.api;

  constructor(private _http: HttpClient) {
    /*
    const { data }: any = (dataRaw as any).default;
    this.dataTracksTrending$ = of(data);

    this.dataTracksRandom$ = new Observable((observer)=> {
      observer.next(data);
    });
    */
  }

  getAllTracks$(): Observable<any> {
    return this._http.get(`${this.URL}/tracks`)
      .pipe(
        map(({ data }: any /*dataRaw: any */) => {
          /* return dataRaw.data; */
          return data;
        })
      )
  }

  private SkipById(listTracks: TrackModel[], id: number): Promise<TrackModel[]> {
    return new Promise((resolve, reject)=>{
      const listTmp = listTracks.filter(a => a._id != id);
      resolve(listTmp);
    })
  }

  getAllRandom$(): Observable<any> {
    return this._http.get(`${this.URL}/tracks`)
      .pipe(
        mergeMap(({ data }: any /*dataRaw: any */) => this.SkipById(data, 2)),
          tap(data => console.log(data)),
          // return dataRaw.data;
          // return data.reverse();
          tap(data => console.log(data)), // si queres hacer un console log podes hacer tap()
          catchError((err)=>{
            return of([]); // el of te permite mandar un resultado estatico en forma de observable
          })

        /* map(({ dataRevertida }: any) => { // aplicamos filter
              // return dataRaw.data; 
              return dataRevertida.filter((track: TrackModel) => track._id != 1);
            }) */
      )
  }
}
