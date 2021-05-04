import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddChantComponent } from './components/add-chant/add-chant.component';
import { ChantDetailsComponent } from './components/chant-details/chant-details.component';
import { ChantListComponent } from './components/chant-list/chant-list.component';
import { ChantFetchComponent } from './components/chant-fetch/chant-fetch.component';
import { HistogramComponent } from './components/histogram/histogram.component';
import { MelodyLengthHistComponent } from './components/melody-length-hist/melody-length-hist.component';
import { MelodyStackedHistComponent } from './components/melody-stacked-hist/melody-stacked-hist.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StackedHistogramComponent } from './components/stacked-histogram/stacked-histogram.component';
import { ScatterPlotComponent } from './components/scatter-plot/scatter-plot.component';
import { AlignedComponent } from './components/aligned/aligned.component';
import { NavigationComponent } from './components/navigation/navigation.component';


@NgModule({
  declarations: [
    AppComponent,
    AddChantComponent,
    ChantDetailsComponent,
    ChantListComponent,
    ChantFetchComponent,
    HistogramComponent,
    MelodyLengthHistComponent,
    MelodyStackedHistComponent,
    DashboardComponent,
    StackedHistogramComponent,
    ScatterPlotComponent,
    AlignedComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
