export type Post = {
    title: string;
    slug: string;
    link?: string;
    date: string;
    created: Date;
    tags: string[];
    description: string;
    excerpt: string;
    body: string;
    lastModified?: number;
    views?: number;
    raw: string;
};

export type Project = {
    title: string;
    description: string;
    href: string;
};
