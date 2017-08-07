import { TestBed, inject } from '@angular/core/testing';

import { PostService } from './post.service';
import { HttpModule } from '@angular/http';

describe('PostService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [ PostService ]
    });
  });

  it('should be created', inject([PostService], (service: PostService) => {
    expect(service).toBeTruthy();
  }));
});
