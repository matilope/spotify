import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /*
  title = 'practicas';

  car: CarModel = {
    brand: 'Ford',
    model:'Focus',
    year:2021
  }

  listCar: Array<CarModel> = [
    {
      brand: 'Ford',
      model:'Focus',
      year:2021
    },
    {
      brand: 'Renault',
      model:'Duster',
      year:2015
    }
  ]
  */
}

type brand = 'Ford' | 'Renault';

interface CarModel {
  brand: brand;
  model: string;
  year?: number;
}