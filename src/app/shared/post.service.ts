import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PostService {

  private endPoint: string = "http://jsonplaceholder.typicode.com/posts";

  constructor(private http: Http) { }

  getPosts(){
    return this.http.get(this.endPoint)
      .map((res:Response) => res.json());
  }

  getPost(id){
    return this.http.get(this.getPostUrl(id))
      .map((res:Response) => res.json());
  }

  addPost(post){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.endPoint, JSON.stringify(post), { headers: headers })
      .map((res:Response) => res.json());
  }

  updatePost(post){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(this.getPostUrl(post.id), JSON.stringify(post), { headers: headers })
      .map((res:Response) => res.json());
  }

  deletePost(id){
    return this.http.delete(this.getPostUrl(id))
      .map((res:Response) => res.json());
  }

  private getPostUrl(id){
    return this.endPoint + "/" + id;
  }

}
