import { BorderedBox } from './components/BorderedBox';
import styles from './page.module.scss';

export default function Home() {
    return (
        <div className={styles.page}>
            <BorderedBox text="Hello, world." />
            <BorderedBox text="My name is Stephen Matheis." />
            <BorderedBox text="This is a very long line full of text that's way too long to fit in 60 chars." />
        </div>
    );
}
