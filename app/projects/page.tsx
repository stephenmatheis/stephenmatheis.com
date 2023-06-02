import { Page } from '@/components/page';
import { Projects } from '@/components/projects';

export default function ProjectsPage({}) {
    return (
        <Page
            links={[
                {
                    label: 'GitHub',
                    path: 'https://github.com/stephenmatheis',
                    external: true,
                },
            ]}
        >
            <Projects displayImages={true} />
        </Page>
    );
}
