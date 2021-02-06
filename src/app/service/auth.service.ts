import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {baseURL} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(data): Observable<any>{
    return this.http.post(`${baseURL}/auth`, data, {responseType: 'json'});
  }

  register(data): Observable<any>{
    return this.http.post(`${baseURL}/users`, data, {responseType: 'text'});
  }

  getToken(){
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean{
    return this.getToken() != null;
  }

  hasRole(role): boolean{
    if(localStorage.getItem('roles') != null)
      return localStorage.getItem('roles').includes(role);
    else return false;
  }

  getUsername(){
    return localStorage.getItem('username');
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('roles');
  }

  getHeaders(){
    if(this.getToken() == null)
      return null;
    return {'Authorization': this.getToken()};
  }
}
