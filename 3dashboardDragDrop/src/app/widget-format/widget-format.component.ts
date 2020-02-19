import { Component, OnInit } from "@angular/core";
import { ViewEncapsulation, ViewChild } from "@angular/core";
import { DashboardLayoutComponent } from "@syncfusion/ej2-angular-layouts";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { WidgetService } from "../widget.service";
import * as _ from "underscore";
import { Widget } from "../widget";
import data from "../../assets/sample-data.json";
import {
  ChartOptions,
  ChartType,
  ChartDataSets,
  RadialChartOptions
} from "chart.js";
import { Label, Color } from "ng2-charts";
@Component({
  selector: "app-widget-format",
  templateUrl: "./widget-format.component.html",
  styleUrls: ["./widget-format.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class WidgetFormatComponent implements OnInit {
  latitude = -28.68352;
  longitude = -147.20785;
  mapType = "satellite";
  chartReady: boolean;
  $: any;
  title = "draggable-dashboard";

  chartData: Array<any> = data.widget;
  widgets: Array<Widget> = [];
  sections: Array<Widget> = [];
  order: any;
  barchart: any;

  subject = [];
  marks = [];
  Linechart = [];
  barChart: any[] = [];
  pieChart: any[] = [];
  /*****barChart */
  public barChartOptions: ChartOptions = {
    responsive: true
  };
  public barChartType: ChartType;
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartLabels: Label[];
  public barChartData: ChartDataSets[];

  /******radarChart */
  public radarChartOptions: RadialChartOptions = {
    responsive: true
  };
  public radarChartLabels: Label[];
  public radarChartType: ChartType;
  public radarChartData: ChartDataSets[];

  /******lineChart */
  public lineChartOptions: ChartOptions = {
    responsive: true
  };
  public lineChartColors: Color[] = [
    {
      borderColor: "black",
      backgroundColor: "rgb(243, 168, 168)"
    }
  ];
  public lineChartLegend = true;
  public lineChartType;
  public lineChartPlugins = [];
  public lineChartLabels: Label[];
  public lineChartData: ChartDataSets[];
  constructor(private widgetService: WidgetService) {
    widgetService.getWidgets().subscribe(
      widgetResponse => {
        var widgets = widgetResponse;
        widgetService.getWidgetOrder().subscribe(orderResponse => {
          this.order = orderResponse.ids;
          _.each(this.order, item => {
            var widget = _.where(widgets, { id: item })[0];
            this.sections.push(widget);
          });
          this.lineChartLabels = this.sections[0].name;
          this.lineChartData = this.sections[0].dataValue;
          this.lineChartType = this.sections[0].format;
          this.barChartLabels = this.sections[2].name;
          this.barChartData = this.sections[2].dataValue;
          this.radarChartLabels = this.sections[1].name;
          this.radarChartData = this.sections[1].dataValue;
          this.radarChartType = this.sections[1].format;
          this.barChartType = this.sections[2].format;

          this.chartReady = true;
        });
      },
      error => {
        console.log("error");
      }
    );
  }

  ngOnInit(): void {}
  @ViewChild("default_dashboard", { static: true })
  public dashboard: DashboardLayoutComponent;
  public count: number = 8;
  public cellSpacing: number[] = [10, 10];

  onCloseIconHandler(event: any): void {
    if ((<HTMLElement>event.target).offsetParent) {
      this.dashboard.removePanel((<HTMLElement>event.target).offsetParent.id);
    }
  }
}
