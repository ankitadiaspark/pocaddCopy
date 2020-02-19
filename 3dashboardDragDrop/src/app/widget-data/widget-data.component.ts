import { Component, OnInit } from "@angular/core";
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
  selector: "app-widget-data",
  templateUrl: "./widget-data.component.html",
  styleUrls: ["./widget-data.component.scss"]
})
export class WidgetDataComponent {
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
  public barChartType: ChartType = "bar";
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartLabels: Label[];
  public barChartData: ChartDataSets[];

  /******radarChart */
  public radarChartOptions: RadialChartOptions = {
    responsive: true
  };
  public radarChartLabels: Label[];
  public radarChartType: ChartType = "radar";
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
  public lineChartType = "line";
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
          this.barChartLabels = this.sections[2].name;
          this.barChartData = this.sections[2].dataValue;
          this.radarChartLabels = this.sections[1].name;
          this.radarChartData = this.sections[1].dataValue;

          this.chartReady = true;
        });
      },
      error => {
        console.log("error");
      }
    );
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.sections, event.previousIndex, event.currentIndex);
    var order: any = {};
    order.ids = [];
    _.each(this.sections, section => {
      order.ids.push(section.id);
    });
    this.widgetService.putWidgetOrder(order).subscribe(
      orderResponse => {},
      error => {
        console.log("error", error);
      }
    );
    this.widgetService.getWidgets().subscribe(
      widgetResponse => {
        var widgets = widgetResponse;
        this.widgetService.getWidgetOrder().subscribe(orderResponse => {
          this.order = orderResponse.ids;

          this.lineChartLabels = this.sections[0].name;
          this.lineChartData = this.sections[0].dataValue;
          this.barChartLabels = this.sections[2].name;
          this.barChartData = this.sections[2].dataValue;
          this.radarChartLabels = this.sections[1].name;
          this.radarChartData = this.sections[1].dataValue;

          this.chartReady = true;
        });
      },
      error => {
        console.log("error");
      }
    );
  }
}
