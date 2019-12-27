import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ChartsModule } from "ng2-charts";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { StorageServiceModule } from "ngx-webstorage-service";
import { WidgetService } from "./services/widget.service";
import { WidgetComponentComponent } from "./components/widget-component/widget-component.component";
import { MatCardModule } from "@angular/material/card";
import { HttpClientModule } from "@angular/common/http";
import { InMemoryWebApiModule } from "angular-in-memory-web-api";
import { ServerService } from "./services/server.service";
import { GridsterModule } from "angular-gridster2";
import { MatGridListModule } from "@angular/material/grid-list";
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatTableModule } from '@angular/material'  ;
@NgModule({
  declarations: [AppComponent, WidgetComponentComponent, HeaderComponent, FooterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule,
    ChartsModule,
    StorageServiceModule,
    MatCardModule,
    HttpClientModule,
    GridsterModule,
    MatGridListModule,
    MatTableModule,
    InMemoryWebApiModule.forRoot(WidgetService)
  ],
  providers: [WidgetService, ServerService],
  bootstrap: [AppComponent]
})
export class AppModule {}
