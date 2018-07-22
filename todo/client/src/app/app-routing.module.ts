import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './components/heroes/heroes.component'
import { DashboardComponent }   from './components/dashboard/dashboard.component';
import { HeroDetailsComponent }  from './components/hero-details/hero-details.component';


const routes: Routes = [
  {path:'todo', component:HeroesComponent},
  {path:'dashboard',component:DashboardComponent},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'detail/:id', component: HeroDetailsComponent}

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]

})
export class AppRoutingModule {


 }
