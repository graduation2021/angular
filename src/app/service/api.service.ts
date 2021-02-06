import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {baseURL} from '../../environments/environment';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getTools(params){
    const headers = this.authService.getHeaders();
    if(headers == null)
      return this.http.get<any>(`${baseURL}/api/tools`, {params});
    else
      return this.http.get<any>(`${baseURL}/api/tools`, { headers, params});
  }

  getTool(id: number){
    const headers = this.authService.getHeaders();
    return this.http.get<any>(`${baseURL}/api/tool/${id}`, { headers});
  }

  addTool(data): Observable<any>{
    const headers = this.authService.getHeaders();
    return this.http.post(`${baseURL}/api/tools`, data, {headers, responseType: 'json'});
  }

  deleteTool(id: number){
    const headers = this.authService.getHeaders();
    return this.http.delete(`${baseURL}/api/tool/${id}`, { headers});
  }

  putTool(id: number, data){
    const headers = this.authService.getHeaders();
    return this.http.put(`${baseURL}/api/tool/${id}`, data, { headers});
  }

  getPosts(id: number){
    const headers = this.authService.getHeaders();
    return this.http.get<any>(`${baseURL}/api/post/${id}`, { headers});
  }

  addPost(id: number, data): Observable<any>{
    const headers = this.authService.getHeaders();
    if (headers == null)
      return null;
    return this.http.post(`${baseURL}/api/post/${id}`, data, {headers, responseType: 'json'});
  }

  deletePost(id: number){
    const headers = this.authService.getHeaders();
    return this.http.delete(`${baseURL}/api/post/${id}`, { headers});
  }

  putPost(id: number, data){
    const headers = this.authService.getHeaders();
    return this.http.put(`${baseURL}/api/post/${id}`, data, { headers});
  }

  getComments(id: number){
    const headers = this.authService.getHeaders();
    return this.http.get<any>(`${baseURL}/api/comment/${id}`, { headers});
  }

  addComment(id: number, data): Observable<any>{
    const headers = this.authService.getHeaders();
    return this.http.post(`${baseURL}/api/comment/${id}`, data, {headers, responseType: 'json'});
  }

  deleteComment(id: number){
    const headers = this.authService.getHeaders();
    return this.http.delete(`${baseURL}/api/comment/${id}`, { headers});
  }

  putComment(id: number, data){
    const headers = this.authService.getHeaders();
    return this.http.put(`${baseURL}/api/comment/${id}`, data, { headers});
  }

  getCategories(){
    const headers = this.authService.getHeaders();
    return this.http.get<any>(`${baseURL}/api/categories`, { headers});
  }

  getPlatforms(){
    const headers = this.authService.getHeaders();
    return this.http.get<any>(`${baseURL}/api/platforms`, { headers});
  }

  getLikes(tool_id: number){
    const headers = this.authService.getHeaders();
    return this.http.get<any>(`${baseURL}/api/like/${tool_id}`, { headers});
  }

  addLike(tool_id: number){
    const headers = this.authService.getHeaders();
    if (headers == null)
      return null;
    else
      return this.http.post(`${baseURL}/api/like/${tool_id}`, null, { headers});
  }

  deleteLike(tool_id: number){
    const headers = this.authService.getHeaders();
    return this.http.delete(`${baseURL}/api/like/${tool_id}`, { headers});
  }
}
