import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetFormatComponent } from './widget-format.component';

describe('WidgetFormatComponent', () => {
  let component: WidgetFormatComponent;
  let fixture: ComponentFixture<WidgetFormatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetFormatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
