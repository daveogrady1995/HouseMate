import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseHousematesComponent } from './browse-housemates.component';

describe('BrowseHousematesComponent', () => {
  let component: BrowseHousematesComponent;
  let fixture: ComponentFixture<BrowseHousematesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseHousematesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseHousematesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
