import { NextRequest, NextResponse } from 'next/server';
import { init } from '@/app/api/lib/init';

type Cookie = {
    name: string;
    value: string;
};

export async function POST(req: NextRequest) {
    const { value: token } = req.cookies.get('token') as Cookie;
    const octokit = await init({ token });

    try {
        await octokit.request('DELETE /applications/{client_id}/token', {
            client_id: process.env.CLIENT_ID || '',
            access_token: token,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28',
            },
        });
    } catch (error) {
        console.log(error);
    }

    const response = NextResponse.json(
        { msg: 'access token revoked' },
        {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods':
                    'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
        }
    );

    response.cookies.delete('name');
    response.cookies.delete('login');
    response.cookies.delete('token');
    response.cookies.delete('refreshToken');

    return response;
}
