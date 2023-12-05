import Link from 'next/link';

export default function NotFound() {
    return (
        <div
            style={{
                height: '100dvh',
                width: '100vw',
                display: 'grid',
                placeItems: 'center',
            }}
        >
            <div
                style={{
                    display: 'grid',
                    placeItems: 'center',
                    gap: 'calc(var(--line-height) * 3)',
                }}
            >
                <div>
                    <div
                        style={{
                            textAlign: 'center',
                            marginBottom: 'var(--line-height)',
                        }}
                    >
                        404
                    </div>
                    <div
                        style={{
                            textAlign: 'center',
                            color: 'var(--muted)',
                        }}
                    >
                        Page not found
                    </div>
                </div>
                <Link href="/">Go back to Home</Link>
            </div>
        </div>
    );
}
