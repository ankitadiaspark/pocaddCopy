export interface Widget {
  orderno: any;
  id: number;
  name: Array<any>;
  dataValue: Array<any>;
  format: any;
}
export interface widgetGrid {
  id: number;
  x: number;
  y: number;
  w: number;
  h: number;
  wSm: number;
  hSm: number;
  wMd: number;
  hMd: number;
  wLg: number;
  hLg: number;
  wXl: number;
  hXl: number;
  dragAndDrop: boolean;
  resizable: boolean;
  title: String;
}
