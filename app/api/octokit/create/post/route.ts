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

// Buffer.from("Hello World").toString('base64')

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { title, content } = body;
    const { value: token } = req.cookies.get('token') as Cookie;
    // const { value: refreshToken } = req.cookies.get('refreshToken') as Cookie;
    const octokit = await init({ token });
    const date: string = new Date().toLocaleDateString('en-US', {
        dateStyle: 'long',
        timeZone: process.env.NEXT_PUBLIC_TIME_ZONE,
    });
    const slug: string = title
        .toLowerCase()
        .replaceAll(' ', '-')
        .replaceAll(',', '')
        .replaceAll('.', '_');
    const path: string = `_posts/${slug}.mdx`;
    const text = `---
title: ${formatName(title)}
date: ${date}
lastModified: ${date}
author: Stephen Matheis
---

${content}
`;

    try {
        const data = await octokit.request(
            'PUT /repos/{owner}/{repo}/contents/{path}',
            {
                owner: 'stephenmatheis',
                repo: 'stephenmatheis.com',
                path,
                branch: 'feat/octokit',
                message: `New post: '${title}'`,
                content: Buffer.from(text).toString('base64'),
            }
        );

        const response = NextResponse.json(
            { msg: 'created post', data },
            options
        );

        return response;
    } catch (error) {
        console.log(error);

        const response = NextResponse.json({ error }, options);

        return response;
    }
}

function formatName(name: string): string {
    const formatted = name.replaceAll('-', ' ');

    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}
