import { addPost, getAllPosts } from "@/app/data/postsforjson";
import { Post } from "@/app/data/posts";
import { NextResponse } from "next/server";

export async function GET() {
    const posts = await getAllPosts();
    return NextResponse.json(posts);
}

export async function POST(request: Request) {
    const body: Omit<Post, 'id'> = await request.json();
    const newPost: Post = { id: Date.now(), ...body };
    await addPost(newPost);
    console.log(await getAllPosts());
    return NextResponse.json(newPost, { status: 201 });
}