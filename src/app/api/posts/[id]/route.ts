import { posts,Post,getPostById } from "@/app/data/posts";
export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    console.log(id);
    const parsedId = parseInt(id);
    console.log(parsedId);
    console.log(typeof (parsedId));
    //const post= posts.find(post => post.id === parseInt(id));
    const post = getPostById(parseInt(params.id));
    console.log(post);
    if (post) {
        return new Response(JSON.stringify(post), { status: 200 });
    }
    else {
        return new Response(JSON.stringify({ message: 'Post not found' }), { status: 404 });
    }
}
export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const postIndex = posts.findIndex(post => post.id === parseInt(id));
    if (postIndex > -1) {
        const body: Partial<Omit<Post, 'id'>> = await request.json();
        posts[postIndex] = { ...posts[postIndex], ...body };
        return new Response(JSON.stringify(posts[postIndex]), { status: 200 });
    }
    else {
        return new Response(JSON.stringify({ message: 'Post not found' }), { status: 404 });
    }
}
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const postIndex = posts.findIndex(post => post.id === parseInt(id));
    if (postIndex > -1) {
        let deletedOne = posts[postIndex]
        console.log(deletedOne);
        posts.splice(postIndex, 1);
        return new Response(JSON.stringify({ message: "Successfully deleted" }), { status: 204 });
    }
    else {
        return new Response(JSON.stringify({ message: 'Post not found' }), { status: 404 });
    }
}

