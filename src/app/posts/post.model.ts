export interface Post {
    id: String;
    title: String;
    content: String;
};


export interface PostX {
    post: {
        id: String;
        title: String;
        content: String;
    }
}