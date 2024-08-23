import { posts,Post } from "@/app/data/posts"; 
export async function GET() {
    console.log("From get posts :", posts);
    return new Response(JSON.stringify(posts), { status: 200 })
}
export async function POST(request: Request) {
    const body: Omit<Post, 'id'> = await request.json();
    const newPost: Post = { id: Date.now(), ...body };
    posts.push(newPost);
    return new Response(JSON.stringify(newPost), { status: 201 });
}
