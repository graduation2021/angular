import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {baseURL} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getUsers(){
    const headers = this.authService.getHeaders();
    return this.http.get<any>(`${baseURL}/admin/users`, { headers});
  }

  getRoles(){
    const headers = this.authService.getHeaders();
    return this.http.get<any>(`${baseURL}/admin/role`, { headers});
  }

  addRole(id: number, data) {
    const headers = this.authService.getHeaders();
    return this.http.patch<any>(`${baseURL}/admin/user/${id}`, data, { headers});
  }

  deleteUser(id: number){
    const headers = this.authService.getHeaders();
    return this.http.delete<any>(`${baseURL}/admin/user/${id}`, { headers});
  }
}
