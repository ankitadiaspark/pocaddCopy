import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { Widget ,widgetGrid} from './widget';
@Injectable({
  providedIn: 'root'
})
export class WidgetService {
  private rootPath = 'http://localhost:3000/';
  private url='http://localhost:5000/'
  constructor(private http: HttpClient) { }
  getWidgets() : Observable<Array<Widget>> {
    return this.http.get(this.rootPath + "widget")
    .pipe(map((response:Array<Widget>) => response));
  }
  getWidgetsGrid() : Observable<Array<widgetGrid>> {
    return this.http.get(this.rootPath + "widgetGrid")
    .pipe(map((response:Array<widgetGrid>) => response));
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




  //API consuming node request
  getServerWidgets() : Observable<Array<any>> {
    return this.http.get(this.url + "widget")
    .pipe(map((response:Array<any>) => response));
  }
  getServerWidgetsGrid() : Observable<Array<any>> {
    return this.http.get(this.url + "widgetGrid")
    .pipe(map((response:Array<any>) => response));
  }
  getServerWidgetOrder() : Observable<any> {
    return this.http.get(this.url + "order")
    .pipe(map((response:any) => response));
  }
}
