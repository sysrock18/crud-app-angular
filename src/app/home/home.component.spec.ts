import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

import { HomeComponent } from './home.component';
import { PostCardComponent } from '../post-card/post-card.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PostService } from '../shared/post.service';
import { HttpModule } from '@angular/http';
import { By } from '@angular/platform-browser'

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent, PostCardComponent ],
      imports: [ NgbModule.forRoot(), HttpModule ],
      providers: [ PostService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('loader should be false when call api posts gets error', () => {
    fixture.detectChanges();
    let postService = fixture.debugElement.injector.get(PostService);
    let spy = spyOn(postService, 'getPosts').and.returnValue({ subscribe: err => {} });
    fixture.whenStable().then(() => { 
      fixture.detectChanges();
      const loader = component.loader;
      expect(loader).toBe(false);
    });
    component.ngOnInit();
  });

});
