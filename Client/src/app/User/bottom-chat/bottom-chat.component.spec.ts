import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomChatComponent } from './bottom-chat.component';

describe('BottomChatComponent', () => {
  let component: BottomChatComponent;
  let fixture: ComponentFixture<BottomChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BottomChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
