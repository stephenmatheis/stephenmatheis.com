import { NextRequest, NextResponse } from 'next/server';
import { init } from '@/app/api/lib/init';

type Cookie = {
    name: string;
    value: string;
};

const options = {
    status: 200,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
};

export async function POST(req: NextRequest) {
    const { value: token } = req.cookies.get('token') as Cookie;
    // const { value: refreshToken } = req.cookies.get('refreshToken') as Cookie;
    const octokit = await init({ token });

    try {
        const issue = await octokit.request(
            'POST /repos/{owner}/{repo}/issues',
            {
                owner: 'stephenmatheis',
                repo: 'stephenmatheis.com',
                title: 'Test',
                body: 'Created with api.',
                assignees: ['stephenmatheis'],
                labels: ['bug'],
            }
        );

        const response = NextResponse.json(
            { msg: 'created issue', data: issue },
            options
        );

        return response;
    } catch (error) {
        console.log(error);

        const response = NextResponse.json({ error }, options);

        return response;
    }
}
