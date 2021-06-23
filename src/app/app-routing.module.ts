import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddChantComponent } from './components/legacy/add-chant/add-chant.component';
import { ChantFetchComponent } from './components/chant-fetch/chant-fetch.component';
import { AlignedComponent } from './components/aligned/aligned.component';
import { DashboardComponent } from './components/visualization/dashboard/dashboard.component';
import { ChantListWrapperComponent } from './components/chant-list-wrapper/chant-list-wrapper.component';
import { DataUploadComponent } from './components/data-upload/data-upload.component';
import { AlignTextComponent } from './components/align-text/align-text.component';


const routes: Routes = [
  { path: '', redirectTo: 'chants', pathMatch: 'full' },
  { path: 'chants', component: ChantListWrapperComponent },
  { path: 'chants/:id', component: ChantFetchComponent },
  { path: 'add', component: AddChantComponent },
  { path: 'align', component: AlignedComponent },
  { path: 'align-text', component: AlignTextComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'upload', component: DataUploadComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
