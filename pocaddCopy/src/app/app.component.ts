import { Component } from "@angular/core";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { WidgetService } from "./widget.service";
import * as _ from "underscore";
import { Widget } from "./widget";
import data from "../assets/sample-data.json";
import { ChartOptions, ChartType, ChartDataSets } from "chart.js";
// import * as pluginDataLabels from "chartjs-plugin-datalabels";
import { Label, SingleDataSet } from "ng2-charts";

import { Chart } from "chart.js";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "draggable-dashboard";
  widgets: Array<Widget> = [];
  sections: Array<Widget> = [];

  order: any;
  subject = [];
  marks = [];
  Linechart=[];
  // barchart = [];

  barChart:any;
  // pieChart:any[]=[];
  // public barChartOptions: ChartOptions = {
  //   responsive: true
  // };
  // public barChartType: ChartType = "bar";
  // public barChartLegend = true;
  // public barChartPlugins = [];

  // public barChartLabels: Label[]=this.sections[0].name;
  // public barChartData: ChartDataSets[] =this.sections[0].dataValue;

  constructor(private widgetService: WidgetService) {
    widgetService.getWidgets().subscribe(
      widgetResponse => {
        var widgets = widgetResponse;
        widgetService.getWidgetOrder().subscribe(orderResponse => {
          this.order = orderResponse.ids;
          _.each(this.order, item => {
            var widget = _.where(widgets, { id: item })[0];
            this.sections.push(widget);
            this.barChart.render();
          });
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
  }
  ngOnInit() {
    this.sections.forEach(x => {
      this.subject.push(x.name);
      this.marks.push(x.dataValue);
    });
    this;
    this.barChart = new Chart("canvas", {
      type: "bar",
      data: {
        labels: this.subject,
        datasets: [
          {
            data: this.marks,
            borderColor: "#3cba9f",
            backgroundColor: [
              "#3cb371",
              "#0000FF",
              "#9966FF",
              "#4C4CFF",
              "#00FFFF",
              "#f990a7",
              "#aad2ed",
              "#FF00FF",
              "Blue",
              "Red",
              "Blue"
            ],
            fill: true
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              display: true
            }
          ],
          yAxes: [
            {
              display: true
            }
          ]
        }
      }
    });
   
    // this.Linechart = new Chart('canvas', {  
    //   type: 'line',  
    //   data: {  
    //     labels: this.subject,  
    //     datasets: [  
    //       {  
    //         data: this.marks,  
    //         borderColor: '#3cb371',  
    //         backgroundColor: "#0000FF",  
    //       }  
    //     ]  
    //   },  
    //   options: {  
    //     legend: {  
    //       display: false  
    //     },  
    //     scales: {  
    //       xAxes: [{  
    //         display: true  
    //       }],  
    //       yAxes: [{  
    //         display: true  
    //       }],  
    //     }  
    //   }  
    // });  
  }


  
}
