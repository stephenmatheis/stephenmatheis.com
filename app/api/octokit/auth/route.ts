import { init } from '@/app/api/lib/init';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const body = await req.json();
    const { code } = body;
    const octokit = await init({ code });
    const {
        token,
        refreshToken,
        clientType,
        expiresAt,
        refreshTokenExpiresAt,
        tokenType,
        type,
    } = (await octokit.auth()) as {
        token: string;
        refreshToken: string;
        clientType: string;
        expiresAt: string;
        refreshTokenExpiresAt: string;
        tokenType: string;
        type: string;
    };
    const {
        data: { login, name },
    } = await octokit.request('GET /user');

    const response = NextResponse.json(
        {
            clientType,
            expiresAt,
            refreshTokenExpiresAt,
            tokenType,
            type,
        },
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

    response.cookies.set({
        name: 'token',
        value: token,
        httpOnly: true,
    });

    response.cookies.set({
        name: 'refreshToken',
        value: refreshToken,
        httpOnly: true,
    });

    // FIXME: Don't set coookie if call is bad
    response.cookies.set({
        name: 'name',
        value: name || '',
        httpOnly: true,
    });

    response.cookies.set({
        name: 'login',
        value: login || '',
        httpOnly: true,
    });

    return response;
}
