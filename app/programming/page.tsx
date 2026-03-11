import styles from './page.module.scss';

const asciiTitle = `██╗  ██╗ ██████╗ ██╗    ██╗    ████████╗ ██████╗     ██████╗ ██████╗  ██████╗  ██████╗ ██████╗  █████╗ ███╗   ███╗
██║  ██║██╔═══██╗██║    ██║    ╚══██╔══╝██╔═══██╗    ██╔══██╗██╔══██╗██╔═══██╗██╔════╝ ██╔══██╗██╔══██╗████╗ ████║
███████║██║   ██║██║ █╗ ██║       ██║   ██║   ██║    ██████╔╝██████╔╝██║   ██║██║  ███╗██████╔╝███████║██╔████╔██║
██╔══██║██║   ██║██║███╗██║       ██║   ██║   ██║    ██╔═══╝ ██╔══██╗██║   ██║██║   ██║██╔══██╗██╔══██║██║╚██╔╝██║
██║  ██║╚██████╔╝╚███╔███╔╝       ██║   ╚██████╔╝    ██║     ██║  ██║╚██████╔╝╚██████╔╝██║  ██║██║  ██║██║ ╚═╝ ██║
╚═╝  ╚═╝ ╚═════╝  ╚══╝╚══╝        ╚═╝    ╚═════╝     ╚═╝     ╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝`;

export default function Page() {
    return (
        <div className={styles.page}>
            <div className={styles.maxwidth}>
                <h1 className={styles.title}>{asciiTitle}</h1>
                <main className={styles.content}>
                    <section>
                        <h2>What do I need to follow along?</h2>
                        <p>
                            Here is a list of hardware and software you'll need to perform the exercises in this guide.
                        </p>
                        <h3>Hardware</h3>
                        <ul>
                            <li>A computer</li>
                            <li>A pointing device</li>
                            <li>A keyboard</li>
                            <li>A display</li>
                        </ul>
                    </section>
                </main>
            </div>
        </div>
    );
}
