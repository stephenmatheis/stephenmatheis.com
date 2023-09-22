export type Post = {
    title: string;
    slug: string;
    link?: string;
    date: string;
    created: string;
    lastModified?: string;
    tags: string[];
    description: string;
    excerpt: string;
    body: string;
    views?: number;
    raw: string;
    status?: string;
    author?: string;
};

export type Project = {
    title: string;
    description: string;
    href: string;
};
