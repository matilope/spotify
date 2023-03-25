import { EventEmitter, Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.models';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {
  callback: EventEmitter<any> = new EventEmitter<any>(); // emite eventos -> podemos subscribir y emitir.

  // myObservable1$!: Observable<any>;
  // myObservable1$: Subject<any> = new Subject();
  // myObservable1$: Subject<any> = new BehaviorSubject("1");
  // Subject y BehaviorSubject son un observable y un observer a la vez. y este ultimo necesita inicializarse con un valor.

  public trackInfo$: BehaviorSubject<any> = new BehaviorSubject(undefined);
  public audio!: HTMLAudioElement;
  public timeElapsed$: BehaviorSubject<string> = new BehaviorSubject("00:00");
  public timeRemaining$: BehaviorSubject<string> = new BehaviorSubject("00:00");
  public playerStatus$: BehaviorSubject<string> = new BehaviorSubject("paused");
  public playerPercentage$: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor() {
    /*
    this.myObservable1$ = new Observable((observer: Observer<any>)=>{
      observer.next("1");
      observer.error("1");
      observer.complete();
    })
    */

    /*
   setTimeout(() => {
     this.myObservable1$.next("a");
   }, 1000)
   */

    this.audio = new Audio();
    this.trackInfo$.subscribe({
      next: (response) => {
        if (response) {
          this.setAudio(response);
        }
      }
    })
    this.listenAllEvents();
  }

  private listenAllEvents(): void {
    this.audio.addEventListener('timeupdate', this.calculateTime, false);
    this.audio.addEventListener('playing', this.setPlayerStatus, false);
    this.audio.addEventListener('play', this.setPlayerStatus, false);
    this.audio.addEventListener('paused', this.setPlayerStatus, false);
    this.audio.addEventListener('ended', this.setPlayerStatus, false);
  }

  private calculateTime = () => {
    const { duration, currentTime } = this.audio;
    this.setTimeElapsed(currentTime);
    this.setTimeRemaining(currentTime, duration);
    this.setPercentage(currentTime, duration);
  }

  private setTimeElapsed(currentTime: number): void {
    let seconds = Math.floor(currentTime % 60);
    let minutes = Math.floor((currentTime / 60) % 60);

    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds;
    const displayMinutes = (minutes < 10) ? `0${minutes}` : minutes;

    const displayFormat = `${displayMinutes}:${displaySeconds}`
    this.timeElapsed$.next(displayFormat);
  }

  private setTimeRemaining(currentTime: number, duration: number): void {
    let timeLeft = duration - currentTime;
    let seconds = Math.floor(timeLeft % 60);
    let minutes = Math.floor((timeLeft / 60) % 60);

    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds;
    const displayMinutes = (minutes < 10) ? `0${minutes}` : minutes;

    const displayFormat = `${displayMinutes}:${displaySeconds}`
    this.timeRemaining$.next(displayFormat);
  }

  
  private setPercentage(currentTime: number, duration: number): void {
    let percentage = (currentTime * 100) / duration;
    this.playerPercentage$.next(percentage);
  }


  private setPlayerStatus = (state: any) => {
    switch (state.type) {
      case 'play':
        this.playerStatus$.next("play");
        break;
      case 'playing':
        this.playerStatus$.next("playing");
        break;
      case 'ended':
        this.playerStatus$.next("ended");
        break;
      default:
        this.playerStatus$.next("paused");
        break;
    }
  }

  public setAudio(track: TrackModel): void {
    this.audio.src = "http://localhost:3000/"+track.url;
    this.audio.play();
  }

  public togglePlayer(): void {
    if (this.audio.paused) {
      this.audio.play();
    } else {
      this.audio.pause();
    };
  }

  public seekAudio(percentage: number): void {
    const { duration } = this.audio;
    const percentageToSecond = (percentage * duration) / 100;
    this.audio.currentTime = percentageToSecond;
  }
  
}
