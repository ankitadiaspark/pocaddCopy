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
    widgetService.getServerWidgets().subscribe(
      widgetResponse => {
        var widgets = widgetResponse;
        widgetService.getServerWidgetOrder().subscribe(orderResponse => {
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

  ngOnInit() {}
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
    this.widgetService.getServerWidgets().subscribe(
      widgetResponse => {
        var widgets = widgetResponse;
        this.widgetService.getServerWidgetOrder().subscribe(orderResponse => {
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
