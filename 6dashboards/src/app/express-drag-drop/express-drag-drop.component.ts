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
  selector: "app-express-drag-drop",
  templateUrl: "./express-drag-drop.component.html",
  styleUrls: ["./express-drag-drop.component.scss"]
})
export class ExpressDragDropComponent implements OnInit {
  chartReady: boolean;
  $: any;
  title = "draggable-dashboard";

  chartData: Array<any> = data.widget;
  widgets: Array<Widget> = [];
  sections: Array<Widget> = [];
  order: Array<any>;
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
    widgetService.getServerWidgets().subscribe(
      widgetResponse => {
        var widgets = widgetResponse;
        console.log(widgets, "widgets");
        console.log(widgets[0].orderno, "widget0");
        widgetService.getServerWidgetOrder().subscribe(orderResponse => {
          console.log(orderResponse, "orderResponse");
          this.order = orderResponse[0].ids;
          console.log(this.order, "order");
          _.each(this.order, item => {
            console.log(item,"item")
            var widget = _.where(widgets, { orderno: item })[0];
            console.log(widget,"widget")
            this.sections.push(widget);
          });
          console.log(this.sections, "widgets1");
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

  ngOnInit() {}
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.sections, event.previousIndex, event.currentIndex);
    var order: any = {};
    order.ids = [];
    _.each(this.sections, section => {
      order.ids.push(section.orderno);
    });
    this.widgetService.putServerWidgetOrder(order).subscribe(
      orderResponse => {
        console.log(orderResponse, "orderResponse");
      },
      error => {
        console.log("error", error);
      }
    );
    this.widgetService.getServerWidgets().subscribe(
      widgetResponse => {
        var widgets = widgetResponse;
        this.widgetService.getServerWidgetOrder().subscribe(orderResponse => {
          this.order = orderResponse[0].ids;
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
