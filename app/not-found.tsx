import Link from 'next/link';

export default function NotFound() {
    return (
        <div>
            <h2 style={{ marginBottom: '1lh' }}>404</h2>
            <p>
                <Link href="/">Return Home</Link>
            </p>
        </div>
    );
}
