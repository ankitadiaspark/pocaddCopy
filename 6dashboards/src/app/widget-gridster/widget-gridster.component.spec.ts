import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetGridsterComponent } from './widget-gridster.component';

describe('WidgetGridsterComponent', () => {
  let component: WidgetGridsterComponent;
  let fixture: ComponentFixture<WidgetGridsterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetGridsterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetGridsterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
