/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BottomSheetOverviewExampleSheetComponent } from './bottom-sheet-overview-example-sheet.component';

describe('BottomSheetOverviewExampleSheetComponent', () => {
  let component: BottomSheetOverviewExampleSheetComponent;
  let fixture: ComponentFixture<BottomSheetOverviewExampleSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BottomSheetOverviewExampleSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomSheetOverviewExampleSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
