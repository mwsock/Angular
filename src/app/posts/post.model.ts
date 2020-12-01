export interface Post {
    id: String;
    title: String;
    content: String;
    imagePath: String;
};


export interface PostX {
    post: {
        id: String;
        title: String;
        content: String;
    }
}