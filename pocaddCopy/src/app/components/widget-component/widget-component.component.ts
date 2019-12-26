import { Component, OnInit } from "@angular/core";
import { ServerService } from "../../services/server.service";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";
import { ChartOptions, ChartType, ChartDataSets } from "chart.js";
// import * as pluginDataLabels from "chartjs-plugin-datalabels";
import { Label, SingleDataSet } from "ng2-charts";
import { Track, info } from "../../shared/Track.model";
import data from "../../shared/data.json";
import { GridsterConfig, GridsterItem } from "angular-gridster2";
@Component({
  selector: "app-widget-component",
  templateUrl: "./widget-component.component.html",
  styleUrls: ["./widget-component.component.scss"]
})
export class WidgetComponentComponent implements OnInit {
  private tracks: Track[] = data;
  private data: any;
  widgets: any[] = [];
  // barChart:any[]=[];
  // pieChart:any[]=[];
  public barChartOptions: ChartOptions = {
    responsive: true
  };
  public barChartLabels: Label[] = [
    "maths",
    "physics",
    "chemistry",
    "language",
    "GK",
    "computer",
    "GA"
  ];
  public barChartType: ChartType = "bar";
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[] = [
    { data: [67, 83, 91, 71, 84, 93, 78], label: "Growth of student" }
  ];
  public pieChartOptions: ChartOptions = {
    responsive: true
  };
  public pieChartLabels: Label[] = [
    ["maths"],
    ["physics"],
    ["chemistry"],
    ["language"],
    ["GK"],
    ["computer"],
    "GA"
  ];
  public pieChartType: ChartType = "pie";
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartData: SingleDataSet = [67, 83, 91, 71, 84, 93, 78];

  constructor(public serverService: ServerService) {}

  ngOnInit() {
    this.serverService.getWidgetData().subscribe((data: any[]) => {
      console.log(data);

      this.widgets = data;
    });
  }
  title = "draggable-dashboard";
  sections = this.data;

  get trackIds(): string[] {
    return this.tracks.map(track => track.id);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } 
    else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  onTrackDrop(event: CdkDragDrop<Track[]>) {
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }
}
