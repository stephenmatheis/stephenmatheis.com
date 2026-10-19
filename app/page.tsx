import styles from "./page.module.scss";

export default function Home() {
    return (
        <div className={styles.page}>
            <p>
                <a href="mailto:stephen@matheis.email">stephen@matheis.email</a>
            </p>
            <p>
                <a href="tel:9124922522">(912) 492-2522</a>
            </p>
        </div>
    );
}
