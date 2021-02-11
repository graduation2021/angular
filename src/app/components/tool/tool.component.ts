import {Component, OnInit} from '@angular/core';
import {Tool} from '../../models/tool';
import {ApiService} from '../../service/api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Post} from '../../models/post';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-tool',
  templateUrl: './tool.component.html',
  styleUrls: ['./tool.component.css']
})
export class ToolComponent implements OnInit {
  id: number;
  tool: Tool;
  posts: Post[];
  addPostForm: FormGroup;
  addCommentForm: FormGroup;

  editPostForm: FormGroup;
  editCommentForm: FormGroup;
  comments: Map<number, any>;
  ready = false;

  constructor(private apiService: ApiService, private route: ActivatedRoute, public authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.ready = false;
    this.posts = [];
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getTool(this.id);
    this.comments = new Map<number, any>();
    this.getPosts(this.id);
    this.initForms();
  }

  editPostClick(post): boolean {
    return post.bool = !post.bool;
  }

  editCommentClick(comment) {
    return comment.bool = !comment.bool;
  }

  initForms() {
    this.addPostForm = new FormGroup({
      content: new FormControl('', [Validators.required])
    });
    this.addCommentForm = new FormGroup({
      content: new FormControl('', [Validators.required])
    });
    this.editPostForm = new FormGroup({
      content: new FormControl('', [Validators.required])
    })
    this.editCommentForm = new FormGroup({
      content: new FormControl('', [Validators.required])
    })
  }

  getTool(id: number) {
    return this.apiService.getTool(id).subscribe(result => {
        this.tool = result['tool'];
        this.ready = true;
      },
      error => {
        console.log('Tool not found');
      });
  }

  deleteTool() {
    return this.apiService.deleteTool(this.id).subscribe(result => {
      this.router.navigate(['tools'], {skipLocationChange: true});
    });
  }

  getPosts(id: number) {
    return this.apiService.getPosts(id).subscribe(result => {
        let posts = [];
        for (let i = 0; i < result.length; i++) {
          posts.push({
            id: result[i]['id'],
            username: result[i]['username'],
            content: result[i]['content'],
            createdDate: result[i]['createdDate'].substring(0, 16).replace('T', ' '),
            bool: false
          });
          this.getComments(i, posts[i].id);
        }
        this.posts = posts;
      },
      error => {
      });
  }

  addPost() {
    if (this.addPostForm.valid) {
      this.apiService.addPost(this.id, this.addPostForm.value).subscribe(result => {
        this.ngOnInit();
      });
    }
  }

  deletePost(id){
    this.apiService.deletePost(id).subscribe(result => {
      this.ngOnInit();
    },
      error => {
      this.ngOnInit();
      });
  }

  updatePost(id){
    this.apiService.putPost(id, this.editPostForm.value).subscribe(result => {
      this.ngOnInit();
    })
  }

  getComments(i, id: number) {
    return this.apiService.getComments(id).subscribe(result => {
        let comments = [];
        for (let i = 0; i < result.length; i++) {
          comments.push({
            id: result[i]['id'],
            username: result[i]['username'],
            content: result[i]['content'],
            createdDate: result[i]['createdDate'].substring(0, 16).replace('T', ' '),
            bool: false
          });
        }
        this.comments.set(i, comments);
      },
      error => {
      });
  }

  addComment(id: number) {
    if (this.addCommentForm.valid) {
      this.apiService.addComment(id, this.addCommentForm.value).subscribe(result => {
        this.ngOnInit();
      });
    }
  }

  deleteComment(id){
    this.apiService.deleteComment(id).subscribe(result => {
        this.ngOnInit();
      },
      error => {
        this.ngOnInit();
      });
  }

  updateComment(id){
    this.apiService.putComment(id, this.editCommentForm.value).subscribe(result => {
      this.ngOnInit();
    })
  }
}
