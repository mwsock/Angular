import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
import { mimeType } from './mime-type.validator';

import { Router } from '@angular/router';
//import { title } from 'process';
//import { read } from 'fs';


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']

})

export class PostCreateComponent implements OnInit {
  enteredTittle = '';
  enteredContent = '';
  post: Post;
  form: FormGroup;
  isLoading = false;
  imagePreview: string;
  private mode = 'create';
  private postId: string;
  constructor(public postsService: PostService, public route: ActivatedRoute, private router: Router) { };

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
      content: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, { validators: [Validators.required], asyncValidators: [mimeType] })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        console.log(this.postId);
        this.isLoading = true;
        this.postsService.getPost(this.postId).subscribe(postData => {
          console.log('postData:' + postData.post);
          this.post = {
            id: postData.post.id,
            title: postData.post.title,
            content: postData.post.content
          };
          // this.form.get['title'].setValue = (this.post.title);
          // this.form.get['content'].setValue = (this.post.content);
          this.form.setValue({
            title: this.post.title,
            content: this.post.content,
            image: null
          })
          this.isLoading = false;
          console.log(this.post);
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSavePost() {
    if (this.form.invalid) {
      return;
    };
    this.isLoading = true;
    if (this.mode === 'create') {
      this.postsService.addPost(this.form.value.title, this.form.value.content);
    } else {
      this.postsService.updatePost(this.postId, this.form.value.title, this.form.value.content);
    };
    // form.resetForm();
    this.router.navigate(['/']);
  };
}