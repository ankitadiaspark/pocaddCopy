import { Component, OnInit } from "@angular/core";
import { ServerService } from '../../services/server.service';
import {CdkDragDrop,moveItemInArray,transferArrayItem} from "@angular/cdk/drag-drop";
// import { ChartOptions, ChartType, ChartDataSets } from "chart.js";
// import * as pluginDataLabels from "chartjs-plugin-datalabels";
// import { Label } from "ng2-charts";
import { Track, info } from "../../shared/Track.model";
import data from "../../shared/data.json";

@Component({
  selector: "app-widget-component",
  templateUrl: "./widget-component.component.html",
  styleUrls: ["./widget-component.component.scss"]
})
export class WidgetComponentComponent implements OnInit {
  private tracks: Track[] = data;
  private data: any;
  widgets: any[] = [];
  constructor(public serverService:ServerService) {}

  ngOnInit() {
    this.serverService.getWidgetData().subscribe((data : any[])=>{
      console.log(data);
      this.widgets = data;
  })
  }
  title = "draggable-dashboard";
  sections = this.data;

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.sections, event.previousIndex, event.currentIndex);
  }
  get trackIds(): string[] {
    return this.tracks.map(track => track.id);
  }

  onTalkDrop(event: CdkDragDrop<info[]>) {
    // In case the destination container is different from the previous container, we
    // need to transfer the given info to the target data array. This happens if
    // a info has been dropped on a different track.
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
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
