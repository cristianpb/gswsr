import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostFacebookComponent } from './post-facebook.component';

describe('PostFacebookComponent', () => {
  let component: PostFacebookComponent;
  let fixture: ComponentFixture<PostFacebookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostFacebookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostFacebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
