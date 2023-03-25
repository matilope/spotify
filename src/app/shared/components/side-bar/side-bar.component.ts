import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {
  public links: Array<any> = [{
    name: 'Home',
    icon: 'bi-house-door'
  },
  {
    name: 'Buscar',
    icon: 'bi-search'
  }];

  public mainMenu: { defaultOptions: Array<any>, accessLink: Array<any>} = {
      defaultOptions: [],
      accessLink: [],
  }

  public customOptions: Array<any> = [];

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.mainMenu.defaultOptions = [
      {
        name: 'Home',
        icon: 'bi-house-door',
        router: ['/', 'auth']
      },
      {
        name: 'Buscar',
        icon: 'bi-search',
        router: ['/', 'history']
      },
      {
        name: 'Tu biblioteca',
        icon: 'bi-book',
        router: ['/', 'favorites'],
        query: { key: 'value' }
      }
    ];

    this.mainMenu.accessLink = [
      {
        name: 'Crear lista',
        icon: 'uil-plus-square'
      },
      {
        name: 'Canciones que te gustan',
        icon: 'uil-heart-medical'
      }
    ];

    this.customOptions = [
      {
        name: 'Mi lista º1',
        router: ['/']
      },
      {
        name: 'Mi lista º2',
        router: ['/']
      },
      {
        name: 'Mi lista º3',
        router: ['/']
      },
      {
        name: 'Mi lista º4',
        router: ['/']
      }
    ];
  }

  goTo(e: any): void{
    // para pasarle query params hacemos:
    this.router.navigate(['favorites'], {
      queryParams: {
        key: 'valor'
      }
    });
    // en el html (click)="goTo($event);"
    // pero en vez de hacer eso, se hace esto en la etiqueta html del li
    // [routerLink]="item.router" [queryParams]="item.query" 
  }
}
