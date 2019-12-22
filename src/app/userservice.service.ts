import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from 'modules/user';


@Injectable()
export class UserserviceService {
//private url = './assets/chup.json';
private url = 'http://localhost:3000/users';
  constructor(private http: HttpClient) { }
  getUser():Observable<User[]>{
return this.http.get<User[]>(this.url);
  }
  saveUser(user:User):Observable<User[]>{
    return this.http.post<User[]>(this.url,user);
  }
}
