import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoverPictureComponent } from './rover-picture.component';

describe('RoverPictureComponent', () => {
  let component: RoverPictureComponent;
  let fixture: ComponentFixture<RoverPictureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoverPictureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoverPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
