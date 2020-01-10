import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetComponentComponent } from './widget-component.component';

describe('WidgetComponentComponent', () => {
  let component: WidgetComponentComponent;
  let fixture: ComponentFixture<WidgetComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
