import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { ChartsModule } from "ng2-charts";
import { CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA  } from "@angular/core";
import { DashboardLayoutModule } from "@syncfusion/ej2-angular-layouts";
import { WidgetDataComponent } from "./widget-data/widget-data.component";
import { WidgetFormatComponent } from "./widget-format/widget-format.component";
import { RouterModule, Routes } from "@angular/router";
import { AgmCoreModule } from '@agm/core';
import { WidgetGridsterComponent } from './widget-gridster/widget-gridster.component';
import { GridsterModule } from 'angular2gridster';
import { FormsModule } from '@angular/forms';
import { ExpressDragDropComponent } from './express-drag-drop/express-drag-drop.component';
const appRoutes: Routes = [
  { path: "data", component: WidgetDataComponent },
  { path: "format", component: WidgetFormatComponent },
  { path: "grid", component: WidgetGridsterComponent },
  { path: "expressGrid", component: ExpressDragDropComponent },
  { path: "", redirectTo: "/data", pathMatch: "full" }
];
@NgModule({
  declarations: [AppComponent, WidgetDataComponent, WidgetFormatComponent, WidgetGridsterComponent, ExpressDragDropComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DragDropModule,
    FormsModule,
    ChartsModule,
    DashboardLayoutModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    AgmCoreModule.forRoot({
      apiKey: 'YOUR GOOGLE MAPS API KEY'
      /* apiKey is required, unless you are a 
      premium customer, in which case you can 
      use clientId 
      */
    }),
    GridsterModule.forRoot()
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule {}
