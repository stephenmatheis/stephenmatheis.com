import { notFound } from 'next/navigation';

export default function DevLayout({ children }: { children: React.ReactNode }) {
    console.log('Environment:', process.env.NODE_ENV);

    if (process.env.NODE_ENV === 'production') {
        notFound();
    }

    return <>{children}</>;
}
