import { NextRequest, NextResponse } from 'next/server';
import { init } from '../../../lib/init';

type Cookie = {
    name: string;
    value: string;
};

export async function POST(req: NextRequest) {
    const { value: token } = req.cookies.get('token') as Cookie;
    // const { value: refreshToken } = req.cookies.get('refreshToken') as Cookie;
    const octokit = await init({ token });
    await octokit.request('POST /repos/{owner}/{repo}/issues', {
        owner: 'stephenmatheis',
        repo: 'stephenmatheis.com',
        title: 'Test',
        body: 'Created with api.',
        assignees: ['stephenmatheis'],
        labels: ['bug'],
    });

    // TODO: Return issue

    const response = NextResponse.json(
        { msg: 'created issue' },
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

    return response;
}
