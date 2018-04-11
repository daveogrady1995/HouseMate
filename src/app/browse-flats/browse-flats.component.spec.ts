import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseFlatsComponent } from './browse-flats.component';

describe('BrowseFlatsComponent', () => {
  let component: BrowseFlatsComponent;
  let fixture: ComponentFixture<BrowseFlatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseFlatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseFlatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
