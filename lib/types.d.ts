export type Post = {
    title: string;
    slug: string;
    date: string;
    tags: string[];
    description: string;
    excerpt: string;
    body: string;
    lastModified?: number;
    views?: number;
};

export type Project = {
    title: string;
    description: string;
    href: string;
};
