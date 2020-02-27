import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressDragDropComponent } from './express-drag-drop.component';

describe('ExpressDragDropComponent', () => {
  let component: ExpressDragDropComponent;
  let fixture: ComponentFixture<ExpressDragDropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpressDragDropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpressDragDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
