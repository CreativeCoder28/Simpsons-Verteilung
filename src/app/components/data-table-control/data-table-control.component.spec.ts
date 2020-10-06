import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableControlComponent } from './data-table-control.component';

describe('DataTableControlComponent', () => {
  let component: DataTableControlComponent;
  let fixture: ComponentFixture<DataTableControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTableControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
