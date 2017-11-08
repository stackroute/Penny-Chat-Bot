import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewContextComponent } from './add-new-context.component';

describe('AddNewContextComponent', () => {
  let component: AddNewContextComponent;
  let fixture: ComponentFixture<AddNewContextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewContextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewContextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
