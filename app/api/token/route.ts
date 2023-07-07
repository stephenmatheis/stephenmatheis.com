export async function POST(req: Request) {
    const body = await req.json();
    const { code } = body;
    const url = `https://github.com/login/oauth/access_token`;
    const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            client_id: 'Iv1.ab22fc239c6dcf88',
            client_secret: 'e45e4d95aada121ffc0effcc856866e804d65915',
            redirect_uri: 'http://localhost:3000/login',
            code,
        }),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });
    const data = await res.json();

    return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
    });
}
