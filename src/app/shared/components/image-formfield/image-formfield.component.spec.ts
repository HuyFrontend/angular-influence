import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageFormfieldComponent } from './image-formfield.component';

describe('ImageFormfieldComponent', () => {
  let component: ImageFormfieldComponent;
  let fixture: ComponentFixture<ImageFormfieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageFormfieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageFormfieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
