import { Viewer } from '@/components/Viewer';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { gruvboxDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import styles from './page.module.scss';

const mkcom = `#!/bin/bash

if [ -z "$1" ]; then
    echo "Usage: mkcom <ComponentName>"
    exit 1
fi

COMPONENT_NAME=$1
COMPONENT_NAME_LOWERCASE=$(echo "$COMPONENT_NAME" | tr '[:upper:]' '[:lower:]')
COMPONENT_DIR="components/$COMPONENT_NAME"

mkdir -p "$COMPONENT_DIR"

cd "$COMPONENT_DIR" || exit

touch "$COMPONENT_NAME.tsx" "$COMPONENT_NAME.module.scss" "index.ts"

echo "export { $COMPONENT_NAME } from './$COMPONENT_NAME';" >index.ts

cat <<EOF >"$COMPONENT_NAME.tsx"
import styles from './$COMPONENT_NAME.module.scss';

export function \${COMPONENT_NAME}() {
    return (
        <div className={styles.$COMPONENT_NAME_LOWERCASE}>
            <h2>$COMPONENT_NAME</h2>
        </div>
    );
};
EOF

cat <<EOF >"$COMPONENT_NAME.module.scss"
.$COMPONENT_NAME_LOWERCASE {
    color: var(--color);
}
EOF

echo "✅ $COMPONENT_NAME created in components/$COMPONENT_NAME"

code "$COMPONENT_NAME.tsx" "$COMPONENT_NAME.module.scss"
`;

const tools = [
    {
        name: 'mkcom',
        description: 'a sh script for creating React components',
        href: '/tools/color-palettes',
        content: (
            <div className={styles.editor}>
                <SyntaxHighlighter
                    language="bash"
                    style={gruvboxDark}
                    showLineNumbers
                    lineNumberStyle={{ color: 'var(--fg4)' }}
                >
                    {mkcom}
                </SyntaxHighlighter>

                {/* <pre>{mkcom}</pre> */}

                {/* {mkcom.split('\n').map((line, index) => {
                    return (
                        <div key={index}>
                            <pre>{line}</pre>
                        </div>
                    );
                })} */}
            </div>
        ),
    },
    {
        name: 'Tool 2',
        description: 'desc',
        href: '/tools/2',
        content: <div className={styles.editor}>Tool 2 content.</div>,
    },
    {
        name: 'Tool 3',
        description: 'desc',
        href: '/tools/3',
        content: <div className={styles.editor}>Tool 3 content.</div>,
    },
];

export default function Page() {
    return <Viewer title="Tools" items={tools} />;
}
