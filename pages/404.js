import Type from '@/components/type';

export default function Custom404() {
    const speed = 80;
    const style = { textAlign: 'center' };

    return (
        <>
            <h1 style={style}>
                <Type content="404" speed={speed} />
            </h1>
            <h3 style={style}>
                <Type content="Page not found" speed={speed / 2} />
            </h3>
        </>
    )
}