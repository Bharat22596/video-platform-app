import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIReference } from '../APIReference';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  getUser(userId:number):Observable<any>{
    var params:any = {'userId':userId};
    return this.http.get<any>(APIReference.GET_USER,{params:params});
  }

  createUser(user:User):Observable<any>{
    return this.http.post<any>(APIReference.CREATE_USER,user);
  }

  updateUser(userId:number,user:User):Observable<any>{
    var params:any = {'userId':userId};
    return this.http.put<any>(APIReference.UPDATE_USER,user,{params:params});
  }
}
