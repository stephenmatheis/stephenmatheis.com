import Link from 'next/link';

export default function NotFound() {
    return (
        <div style={{ fontSize: '1.5em' }}>
            <p style={{ color: 'var(--birch)' }}>[404]</p>
            <Link href="/">Return</Link>
        </div>
    );
}
