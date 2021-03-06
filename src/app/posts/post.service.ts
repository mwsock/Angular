import { Post, PostX } from '../posts/post.model';
import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Content } from '@angular/compiler/src/render3/r3_ast';

@Injectable({ providedIn: 'root' })
export class PostService {

    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();

    constructor(private http: HttpClient) { }

    getPosts() {
        this.http.get<{ message: string, posts: any }>('http://localhost:3000/api/posts')
            .pipe(map((postData) => {
                return postData.posts.map(post => {
                    return {
                        title: post.title,
                        content: post.content,
                        id: post._id,
                        imagePath: post.imagePath
                    };
                });
            }))
            .subscribe((transformedPosts) => {
                this.posts = transformedPosts;
                console.log(transformedPosts);
                this.postsUpdated.next([...this.posts]);
            });
    };

    getPostUpdateListener() {
        return this.postsUpdated.asObservable();
    }



    getPost(id: string): Observable<PostX> {
        console.log('http://localhost:3000/api/posts/' + id)
        return this.http.get<PostX>('http://localhost:3000/api/posts/' + id);
    }

    addPost(title: string, content: string, image: File) {
        // const post: Post = { id: null, title: title, content: content };
        const postData = new FormData();
        postData.append('title', title);
        postData.append('content', content);
        postData.append('image', image, title);
        console.log(postData);
        this.http.post<{ message: string, post: Post }>('http://localhost:3000/api/posts', postData)
            .subscribe((data) => {
                const post: Post = { id: data.post.id, title: title, content: content, imagePath: data.post.imagePath };
                this.posts.push(post);
                this.postsUpdated.next([...this.posts]);
            })
    };

    updatePost(id: string, title: string, content: string) {
        const post: Post = { id: id, title: title, content: content, imagePath: null }
        this.http.put('http://localhost:3000/api/posts/' + id, post)
            .subscribe(response => {
                const updatedPosts = [...this.posts];
                const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
                updatedPosts[oldPostIndex] = post;
                this.posts = updatedPosts;
                this.postsUpdated.next([...this.posts]);
            });
    };

    deletePost(postId: string) {

        this.http.delete('http://localhost:3000/api/posts/' + postId)
            .subscribe(() => {
                const updatedPosts = this.posts.filter(post => post.id !== postId);
                console.log(this.posts);
                this.posts = updatedPosts;
                this.postsUpdated.next([...this.posts]);
                console.log('deleted!')
            })
    }
};