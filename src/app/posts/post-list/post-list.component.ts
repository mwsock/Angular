import { Component } from "@angular/core";
import { style } from '@angular/animations';

@Component({
    selector: "app-post-list",
    templateUrl: "./post-list.component.html",
    styleUrls: ["./post-list.component.css"]
    
})

export class PostListComponent{
    posts = [
        {tittle: 'Post1', content: "Post1 Content"},
        {tittle: 'Post2', content: "Post2 Content"},
        {tittle: 'Post3', content: "Post3 Content"}
    ]
};