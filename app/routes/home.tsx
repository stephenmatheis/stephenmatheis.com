import type { Route } from './+types/home';
import { Welcome } from '../welcome/welcome';

export function meta({}: Route.MetaArgs) {
    return [{ title: 'Root' }, { name: 'description', content: 'My site.' }];
}

export default function Home() {
    return <Welcome />;
}
