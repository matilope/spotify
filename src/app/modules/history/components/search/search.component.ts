import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  @Output() callbackData: EventEmitter<any> = new EventEmitter();
  public src!: string;

  callSearch(termino: string): void{
    if(termino.length>=3){
      this.callbackData.emit(termino);
    }
  }

}
