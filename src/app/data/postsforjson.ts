import fs from 'fs/promises';
import path from 'path';
import { Post } from './posts'

// const postsFilePath = path.join(process.cwd(), 'app/data/posts.json')
// console.log(postsFilePath);
const postsFilePath = path.join(process.cwd(), 'app', 'data', 'posts.json');
console.log("Posts file path:", postsFilePath);

async function ensurePostsFileExists() {
  try {
    await fs.access(postsFilePath);
  } catch (error) {
    // File does not exist, so create it with an empty array
    await fs.writeFile(postsFilePath, JSON.stringify([]));
  }
}

export async function readPostsFromFile(): Promise<Post[]>{
    await ensurePostsFileExists();
    const fileContent = await fs.readFile(postsFilePath, 'utf-8');
    return JSON.parse(fileContent) as Post[];
}

export async function writePostsToFile(posts:Post[]):Promise<void> {
    await fs.writeFile(postsFilePath, JSON.stringify(posts, null, 2));
}
//remove the null and 2 and check

export async function getAllPosts(): Promise<Post[]>{
    return await readPostsFromFile();
}

export async function getPostById(id:number): Promise<Post|undefined>{
    const posts = await readPostsFromFile();
    return posts.find(post => post.id === id);
}

export async function addPost(newPost: Post): Promise<void>{
    const posts = await readPostsFromFile();
    posts.push(newPost);
    await writePostsToFile(posts);
}

export async function updatePostById(id: number, updatedPost: Partial<Post>): Promise<Post | undefined>{
    const posts = await readPostsFromFile();
    const postIndex = posts.findIndex(post => post.id === id);
    if (postIndex !== -1) {
        posts[postIndex] = { ...posts[postIndex], ...updatedPost };
        await writePostsToFile(posts);
        return posts[postIndex];
    }
    return undefined;
}

export async function deletePostById(id: number): Promise<boolean> {
    let posts = await readPostsFromFile();
    const initialLength = posts.length;
    posts = posts.filter(post => post.id !== id);
    if (posts.length < initialLength) {
        await writePostsToFile(posts);
        return true;
    }
    return false;
}


