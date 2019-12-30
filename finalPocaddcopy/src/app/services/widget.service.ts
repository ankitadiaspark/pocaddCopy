import { Inject, Injectable } from "@angular/core";
import data from "../shared/data.json";
import { Observable } from "rxjs";
import { Track,  } from "../shared/Track.model";
import { HttpClient } from "@angular/common/http";
import { InMemoryDbService } from "angular-in-memory-web-api";
@Injectable({
  providedIn: "root"
})
export class WidgetService {
  private tracks: Track[] = data.widget;

  readonly _jsonURL = "../shared/data.json";

  constructor() {}
  createDb() {
    let widgets = ([] = this.tracks);

    return { widgets };
  }
}
