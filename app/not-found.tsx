import Link from 'next/link';

export default function NotFound() {
    return (
        <>
            <pre>[404]</pre>
            <pre>
                <Link href="/">Return</Link>
            </pre>
        </>
    );
}
