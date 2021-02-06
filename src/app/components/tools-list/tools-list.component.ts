import {Component, OnInit} from '@angular/core';
import {Tool} from '../../models/tool';
import {ApiService} from '../../service/api.service';
import {HttpParams} from '@angular/common/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-tools-list',
  templateUrl: './tools-list.component.html',
  styleUrls: ['./tools-list.component.css']
})
export class ToolsListComponent implements OnInit {

  tools: Tool[];
  categories: string[];
  platforms: string[];
  categoryToFilter = [];
  platformToFilter = [];
  keywordForm: FormGroup;
  sort = 'numberOfLikesDesc';

  constructor(private apiService: ApiService, public authService: AuthService) {
  }

  ngOnInit() {
    this.getAllTools();
    this.initForm();
  }

  initForm(){
    this.keywordForm = new FormGroup({
      keyword: new FormControl('', [Validators.required])
    })
  }

  getLikes(){
    this.tools.forEach(value => {
      this.apiService.getLikes(value.id).subscribe(result => {
        value.numberOfLikes = result['numberOfLikes'];
        value.isLikedByUser = result['likedByUser'];
      });
    });
  }

  addLike(id){
    this.apiService.addLike(id).subscribe(result => {
      this.tools.find(tool => tool.id == id).isLikedByUser = true;
      this.tools.find(tool => tool.id == id).numberOfLikes += 1;
    });
  }

  deleteLike(id){
    this.apiService.deleteLike(id).subscribe(result => {
      this.tools.find(tool => tool.id == id).isLikedByUser = false;
      this.tools.find(tool => tool.id == id).numberOfLikes += -1;
    });
  }

  getAllTools(){
    let params = new HttpParams();
    this.apiService.getTools(params).subscribe(result => {
      this.tools = result['tools'];
      this.getLikes();
      this.categories = result['categories'];
      this.platforms = result['platforms'];
    });
  }

  getFilteredTools(){
    let param = new HttpParams().set('categories', this.categoryToFilter.toString());
    param = param.append('platforms', this.platformToFilter.toString());
    param = param.append('keywords', this.keywordForm.controls.keyword.value);
    param = param.append('orderBy', this.sort);
    this.apiService.getTools(param).subscribe(result => {
      this.tools = result['tools'];
      this.getLikes();
    });
  }

  onChange(value){
    this.sort = value;
    this.getFilteredTools();
  }

  addFilter(list, filter){
    if(!list.includes(filter)){
      list.push(filter);
    }
    else {
      const index = list.indexOf(filter);
      list.splice(index, 1);
    }
  }
}
