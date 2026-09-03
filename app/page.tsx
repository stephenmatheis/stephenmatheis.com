import { Prompt } from './prompt';

export default function Home() {
    return (
        <>
            <header>
                <h1>STEPHEN MATHEIS</h1>
                <h2>THINKING MEAT</h2>
                <h3>IN SERVICE 1988-{new Date().getFullYear()}</h3>
            </header>
            <main>
                <Prompt />
            </main>
        </>
    );
}
