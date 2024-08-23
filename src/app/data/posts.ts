export interface Post{
    id: number;
    ttle: string;
    content: string;
    author: string;
};
export let posts: Post[] = [];
export function getPostById(id: number): Post | undefined {
    console.log('Looking for post with ID:', id);
    console.log('Current posts:', posts);
     const foundPost = posts.find(post => post.id === id);

   console.log('Found post:', foundPost);
    return foundPost;
    
}