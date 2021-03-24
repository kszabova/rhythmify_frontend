import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChantListComponent } from './components/chant-list/chant-list.component';
import { ChantDetailsComponent } from './components/chant-details/chant-details.component';
import { AddChantComponent } from './components/add-chant/add-chant.component';


const routes: Routes = [
  { path: '', redirectTo: 'chants', pathMatch: 'full' },
  { path: 'chants', component: ChantListComponent },
  { path: 'chants/:id', component: ChantDetailsComponent },
  { path: 'add', component: AddChantComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
