import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { Widget } from './widget';
@Injectable({
  providedIn: 'root'
})
export class WidgetService {
  private rootPath = 'http://localhost:3000/';
  private err:any;
  constructor(private http: HttpClient) { }
  getWidgets() : Observable<Array<Widget>> {
    return this.http.get(this.rootPath + "widget")
    .pipe(map((response:Array<Widget>) => response));
  }
  getWidgetOrder() : Observable<any> {
    return this.http.get(this.rootPath + "order")
    .pipe(map((response:any) => response));
  }
  putWidgetOrder(order : any) : Observable<any> {
    return this.http.put(this.rootPath + "order",  order, {
      headers: new HttpHeaders ({ 
        'Content-Type': 'application/json' 
      })
    })
    .pipe(map((response:any) => response));
  }
}
