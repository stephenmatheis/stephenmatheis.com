import Link from 'next/link';

export default function Home() {
    return (
        <>
            <pre>
                Hello, there. <Link href="https://github.com/stephenmatheis">{"Here's some of my work"}.</Link>
            </pre>
        </>
    );
}
