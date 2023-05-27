import LinkCtr from '@/components/link-ctr';

export default function NotFound() {
    return (
        <div
            style={{
                height: '100dvh',
                width: '100vw',
                paddingTop: '90px',
                display: 'flex',
                flexDirection: 'column',
                alignCenter: 'center',
            }}
        >
            <h1 style={{ textAlign: 'center' }}>404 - Page not found</h1>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <LinkCtr text="Go back to Home" href="/" />
            </div>
        </div>
    );
}
