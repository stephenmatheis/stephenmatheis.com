import Type from '@/components/type/type';

export default function Custom404() {
    const speed = 100;
    const style = { textAlign: 'center' };

    return (
        <>
            <h1 style={style}>
                <Type content="404" speed={speed} />
            </h1>
            <h3 style={style}>
                <Type content="Page not found" speed={speed / 2} delay={delayAfter('404', speed)} />
            </h3>
        </>
    )
}

function delayAfter(text, speed, modifier = 0) {
    return ((text.length + modifier) * speed) + (speed * 2);
}