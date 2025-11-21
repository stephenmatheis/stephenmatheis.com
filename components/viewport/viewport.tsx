import { Sheet } from '@/components/sheet';
import styles from './viewport.module.scss';

export function Viewport({ children }: { children: React.ReactNode }) {
    return (
        <div className={styles.viewport}>
            {/* <div className={styles.details}>
                <ul>
                    <li>
                        <span>Page Width</span>
                        <span>8.5in (816px)</span>
                    </li>
                    <li>
                        <span>Page Height</span>
                        <span>11in (1056px)</span>
                    </li>
                    <li>
                        <span>Padding Top/Bottom</span>
                        <span>44px (2 lines)</span>
                    </li>
                    <li>
                        <span>Padding Left/Right</span>
                        <span>48px (6 characters)</span>
                    </li>
                    <li>
                        <span>Content Width</span>
                        <span>720px (90 characters)</span>
                    </li>
                    <li>
                        <span>Content Height</span>
                        <span>968px (44 lines)</span>
                    </li>
                    <li>
                        <span>Font Size</span>
                        <span>11px</span>
                    </li>
                    <li>
                        <span>Character Width</span>
                        <span>8px</span>
                    </li>
                    <li>
                        <span>Line Height</span>
                        <span>22px</span>
                    </li>
                </ul>
            </div> */}
            <Sheet>{children}</Sheet>
        </div>
    );
}
