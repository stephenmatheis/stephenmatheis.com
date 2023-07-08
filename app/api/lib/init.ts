import { Octokit } from 'octokit';
import { createOAuthUserAuth } from '@octokit/auth-oauth-user';

export async function init({
    code,
    token,
}: {
    code?: string;
    token?: string | undefined;
}) {
    return new Octokit({
        authStrategy: createOAuthUserAuth,
        auth: {
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            clientType: 'github-app',
            ...(code ? { code } : {}),
            ...(token ? { token } : {}),
        },
    });
}
