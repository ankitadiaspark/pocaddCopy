import { Component, OnInit } from "@angular/core";
import { ViewEncapsulation, ViewChild } from "@angular/core";
import {
  IGridsterOptions,
  IGridsterDraggableOptions,
  GridsterComponent
} from "angular2gridster";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { WidgetService } from "../widget.service";
import * as _ from "underscore";
import { Widget } from "../widget";
import data from "../../assets/sampleGridData.json";
import {
  ChartOptions,
  ChartType,
  ChartDataSets,
  RadialChartOptions
} from "chart.js";
import { Label, Color } from "ng2-charts";
import { SingleDataSet } from "ng2-charts";
import { MultiDataSet } from "ng2-charts";
@Component({
  selector: "app-expressgriddragdrop",
  templateUrl: "./expressgriddragdrop.component.html",
  styleUrls: ["./expressgriddragdrop.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class ExpressgriddragdropComponent implements OnInit {
  chartReady: boolean;
  $: any;
  title = "draggable-dashboard";

  chartData: Array<any> = data.widget;
  widgetss: Array<Widget> = [];
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
  // Doughnut
  public doughnutChartLabels: Label[];
  public doughnutChartData: MultiDataSet;
  public doughnutChartType: ChartType;
  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true
  };
  public pieChartLabels: Label[];
  public pieChartData: SingleDataSet;
  public pieChartType: ChartType;
  public pieChartLegend = true;
  public pieChartPlugins = [];

  //polar
  public polarAreaChartLabels: Label[];
  public polarAreaChartData: SingleDataSet;
  public polarAreaChartType: ChartType;
  public polarAreaLegend = true;

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

  static X_PROPERTY_MAP: any = {
    sm: "xSm",
    md: "xMd",
    lg: "xLg",
    xl: "xXl"
  };

  static Y_PROPERTY_MAP: any = {
    sm: "ySm",
    md: "yMd",
    lg: "yLg",
    xl: "yXl"
  };

  static W_PROPERTY_MAP: any = {
    sm: "wSm",
    md: "wMd",
    lg: "wLg",
    xl: "wXl"
  };

  static H_PROPERTY_MAP: any = {
    sm: "hSm",
    md: "hMd",
    lg: "hLg",
    xl: "hXl"
  };

  @ViewChild(GridsterComponent, { static: true }) gridster: GridsterComponent;
  itemOptions = {
    maxWidth: 3,
    maxHeight: 4
  };
  gridsterOptions: IGridsterOptions = {
    lanes: 1,
    direction: "vertical",
    floating: true,
    dragAndDrop: true,
    resizable: true,
    resizeHandles: {
      s: true,
      e: true,
      se: true
    },
    widthHeightRatio: 1,
    lines: {
      visible: true,
      color: "#dedede",
      width: 2
    },
    shrink: true,
    useCSSTransforms: true,
    responsiveView: true,
    responsiveDebounce: 500,
    responsiveSizes: true,
    responsiveToParent: true,

    responsiveOptions: [
      {
        breakpoint: "sm",
        minWidth: 768,
        lanes: 8
      },
      {
        breakpoint: "md",
        minWidth: 768,
        lanes: 8
      },
      {
        breakpoint: "lg",
        minWidth: 768,
        lanes: 8
      },
      {
        breakpoint: "xl",
        minWidth: 768,
        lanes: 8
      }
    ]
  };
  gridsterDraggableOptions: IGridsterDraggableOptions = {
    handlerClass: "panel-heading"
  };

  widgetsCopy = [];
  widgets: Array<any> = [];

  ngOnInit() {}

  constructor(private widgetService: WidgetService) {
    widgetService.getServerWidgetsGrid().subscribe(
      widgetResponse => {
        var widgets = widgetResponse;
        widgetService.getServerWidgetOrder().subscribe(orderResponse => {
          this.order = orderResponse[0].ids;
          _.each(this.order, item => {
            var widget = _.where(widgets, { gridOrderNo: item })[0];
            this.widgets.push(widget);
          });
          widgetService.getServerWidgets().subscribe(widgetSectionResponse => {
            var sectionResponse = widgetSectionResponse;
            _.each(this.order, item => {
              var widgetSection = _.where(sectionResponse, {
                orderno: item
              })[0];
              this.sections.push(widgetSection);
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
            this.polarAreaChartLabels = this.sections[3].name;
            this.polarAreaChartData = this.sections[3].dataValue;
            this.polarAreaChartType = this.sections[3].format;
            this.doughnutChartLabels = this.sections[5].name;
            this.doughnutChartData = this.sections[5].dataValue;
            this.doughnutChartType = this.sections[5].format;
            this.pieChartLabels = this.sections[4].name;
            this.pieChartData = this.sections[4].dataValue;
            this.pieChartType = this.sections[4].format;
            this.chartReady = true;
          });
        });
      },
      error => {
        console.log("error");
      }
    );
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.widgets, event.previousIndex, event.currentIndex);
    var order: any = {};
    order.ids = [];
    _.each(this.widgets, section => {
      console.log(section.gridOrderNo,"gridOrderNo")
      order.ids.push(section.gridOrderNo);
    });
    this.widgetService.putServerWidgetOrder(order).subscribe(
      orderResponse => {},
      error => {
        console.log("error", error);
      }
    );
    this.widgetService.getServerWidgetsGrid().subscribe(
      widgetResponse => {
        var widgets = widgetResponse;

        this.widgetService.getServerWidgetOrder().subscribe(orderResponse => {
          this.order = orderResponse[0].ids;

          this.widgetService
            .getServerWidgets()
            .subscribe(widgetSectionResponse => {
              var sectionResponse = widgetSectionResponse;

              this.lineChartLabels = this.sections[0].name;
              this.lineChartData = this.sections[0].dataValue;
              this.lineChartType = this.sections[0].format;
              this.barChartLabels = this.sections[2].name;
              this.barChartData = this.sections[2].dataValue;
              this.radarChartLabels = this.sections[1].name;
              this.radarChartData = this.sections[1].dataValue;
              this.radarChartType = this.sections[1].format;
              this.barChartType = this.sections[2].format;
              this.polarAreaChartLabels = this.sections[3].name;
              this.polarAreaChartData = this.sections[3].dataValue;
              this.polarAreaChartType = this.sections[3].format;
              this.doughnutChartLabels = this.sections[5].name;
              this.doughnutChartData = this.sections[5].dataValue;
              this.doughnutChartType = this.sections[5].format;
              this.pieChartLabels = this.sections[4].name;
              this.pieChartData = this.sections[4].dataValue;
              this.pieChartType = this.sections[4].format;
              this.chartReady = true;
            });
        });
      },
      error => {
        console.log("error");
      }
    );
  }

  itemChange($event: any, gridster) {
    console.log("item change", $event);
    console.log("gridster", gridster);
  }
}
