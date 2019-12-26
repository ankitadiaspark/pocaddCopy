import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ServerService {
  SERVER_URL: string = "http://localhost:8080/api/";
  constructor(private http: HttpClient) {}

  public getWidgetData() {
    return this.http.get(this.SERVER_URL + "widgets");
  }

  public getWidgetDataById(widgetId) {
    return this.http.get(`${this.SERVER_URL + "widgets"}/${widgetId}`);
  }
  public createWidget(widget: {
    id: number;
    amount: number;
    clientId: number;
    userId: number;
    description: string;
  }) {
    return this.http.post(`${this.SERVER_URL + "widgets"}`, widget);
  }

  public deleteWidget(widgetId) {
    return this.http.delete(`${this.SERVER_URL + "widgets"}/${widgetId}`);
  }
  public updateWidget(widget: {
    id: number;
    amount: number;
    clientId: number;
    userId: number;
    description: string;
  }) {
    return this.http.put(`${this.SERVER_URL + "widgets"}/${widget.id}`, widget);
  }
}
