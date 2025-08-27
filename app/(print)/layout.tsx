import './layout.scss';

export default function SheetLayout({ children }: { children: React.ReactNode }) {
    return <div className="page">{children}</div>;
}
