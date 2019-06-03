import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostInstaComponent } from './post-insta.component';

describe('PostInstaComponent', () => {
  let component: PostInstaComponent;
  let fixture: ComponentFixture<PostInstaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostInstaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostInstaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
