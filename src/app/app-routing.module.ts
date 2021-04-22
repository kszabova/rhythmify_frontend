import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChantListComponent } from './components/chant-list/chant-list.component';
import { AddChantComponent } from './components/add-chant/add-chant.component';
import { ChantFetchComponent } from './components/chant-fetch/chant-fetch.component';
import { AlignedComponent } from './components/aligned/aligned.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


const routes: Routes = [
  { path: '', redirectTo: 'chants', pathMatch: 'full' },
  { path: 'chants', component: ChantListComponent },
  { path: 'chants/:id', component: ChantFetchComponent },
  { path: 'add', component: AddChantComponent },
  { path: 'align', component: AlignedComponent },
  { path: 'dashboard', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
