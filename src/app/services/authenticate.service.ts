import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { APIReference } from '../APIReference';
import { User } from '../models/user';
import { UserService } from './user-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  private currentUserSubject: Subject<User> = new Subject<User>();


  constructor(private http: HttpClient,
    private userService: UserService) {

  }

  public get currentUserValue(): Observable<any> {
    return this.userService.getUser(Number(localStorage.getItem('currentUser')))
  }

  login(username: string, password: string): Observable<any> {
    var params: any = { 'username': username, 'password': password }
    return this.http.get<any>(APIReference.AUTHENTICATE_USER, { params: params })
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(undefined);
  }
}
