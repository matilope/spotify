import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SessionGuard } from '@core/guards/session.guard';
import { HomePageComponent } from '@modules/home/pages/home-page/home-page.component';

const routes: Routes = [
    {
      path:'',
      component: HomePageComponent,
      canActivate: [SessionGuard],
      loadChildren: () => import('./modules/home/home.module').then(m=> m.HomeModule)
    },
    {
      path:'auth',
      loadChildren: () => import('./modules/auth/auth.module').then(m=> m.AuthModule)
    },
    {
      path:'**',
      redirectTo: ''
    }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      //initialNavigation: 'enabled',
      preloadingStrategy: PreloadAllModules,
    })
  ],
  providers: [],
  exports: [RouterModule],
})
export class AppRoutingModule { }
