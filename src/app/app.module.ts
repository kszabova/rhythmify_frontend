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
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddChantComponent } from './components/legacy/add-chant/add-chant.component';
import { ChantDetailsComponent } from './components/chant-details/chant-details.component';
import { ChantListComponent } from './components/chant-list/chant-list.component';
import { ChantFetchComponent } from './components/chant-fetch/chant-fetch.component';
import { HistogramComponent } from './components/visualization/histogram/histogram.component';
import { MelodyLengthHistComponent } from './components/legacy/melody-length-hist/melody-length-hist.component';
import { MelodyStackedHistComponent } from './components/legacy/melody-stacked-hist/melody-stacked-hist.component';
import { DashboardComponent } from './components/visualization/dashboard/dashboard.component';
import { StackedHistogramComponent } from './components/visualization/stacked-histogram/stacked-histogram.component';
import { ScatterPlotComponent } from './components/visualization/scatter-plot/scatter-plot.component';
import { AlignedComponent } from './components/aligned/aligned.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ChantListWrapperComponent } from './components/chant-list-wrapper/chant-list-wrapper.component';
import { NoChantTextDialogComponent } from './components/dialogs/no-chant-text-dialog/no-chant-text-dialog.component';
import { NotEnoughToAlingDialogComponent } from './components/dialogs/not-enough-to-aling-dialog/not-enough-to-aling-dialog.component';
import { AlignmentErrorDialogComponent } from './components/dialogs/alignment-error-dialog/alignment-error-dialog.component';
import { ZoomableScatterPlotComponent } from './components/visualization/zoomable-scatter-plot/zoomable-scatter-plot.component';
import { ChantDetailDialogComponent } from './components/dialogs/chant-detail-dialog/chant-detail-dialog.component';
import { MultipleSeriesScatterplotComponent } from './components/visualization/multiple-series-scatterplot/multiple-series-scatterplot.component';
import { DataUploadComponent } from './components/data-upload/data-upload.component';
import { SelectDataSourceComponent } from './components/select-data-source/select-data-source.component';
import { SourceSelectionSavedDialogComponent } from './components/dialogs/source-selection-saved-dialog/source-selection-saved-dialog.component';
import { UploadSuccessfulDialogComponent } from './components/dialogs/upload-successful-dialog/upload-successful-dialog.component';


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
    NavigationComponent,
    ChantListWrapperComponent,
    NoChantTextDialogComponent,
    NotEnoughToAlingDialogComponent,
    AlignmentErrorDialogComponent,
    ZoomableScatterPlotComponent,
    ChantDetailDialogComponent,
    MultipleSeriesScatterplotComponent,
    DataUploadComponent,
    SelectDataSourceComponent,
    SourceSelectionSavedDialogComponent,
    UploadSuccessfulDialogComponent
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
    MatIconModule,
    MatPaginatorModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatProgressSpinnerModule
  ],
  entryComponents: [
    ChantDetailDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
