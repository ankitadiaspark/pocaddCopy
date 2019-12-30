import { Component, OnInit } from "@angular/core";
import { ServerService } from "../../services/server.service";
import _ from "underscore";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";
import { ChartOptions, ChartType, ChartDataSets } from "chart.js";
import { Label, SingleDataSet } from "ng2-charts";
import { Track } from "../../shared/Track.model";
import data from "../../shared/data.json";
@Component({
  selector: "app-widget-component",
  templateUrl: "./widget-component.component.html",
  styleUrls: ["./widget-component.component.scss"]
})
export class WidgetComponentComponent implements OnInit {
  public order: number[] = data.order;
  private sections: Array<Track> = data.widget;
  //private sections : Array<Track> = [];
   
  constructor(public serverService: ServerService) {
    //_.each
    // this.order.forEach(item => {
    //   this.sections.push(_.where(widget,{id : 1})[0])

    // });
    this.sections.forEach(_order => {
      this.sections.find(order => {
        this.sections.push(order);
        return order;
      });
    });
  }

  ngOnInit() {}
  title = "draggable-dashboard";
  drop(event: CdkDragDrop<string[]>) {
    let i: number;
    moveItemInArray(this.sections, event.previousIndex, event.currentIndex);
    console.log(this.sections);
    console.log(event.currentIndex, "currrent");
    console.log(event.previousIndex, "previous");

     

    // console.log(this.sections[event.currentIndex].id,"statement");
    event.previousIndex = event.currentIndex;
    console.log(event.previousIndex, "updatedPrevious");
    console.log(this.sections[event.previousIndex]);

    // this.sections[].id=event.previousIndex;
    console.log(event.currentIndex, "currrent");
  }



}
