/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';
import styles from './page.module.scss';
import { ScrollJacked } from '@/components/scrolljacked';
import { Demo } from '@/components/demo';
import classNames from 'classnames';
import { Title } from '@/components/title';
import { Code } from '@/components/code';

export default function HomePage() {
    return (
        <div className={styles.home}>
            <header>
                <div className="maxwidth">
                    <div className={styles.heading}>
                        <Title />
                        <menu>
                            <Link href="/resume.pdf">↓ DOWNLOAD</Link>
                            <Link
                                href="https://github.com/stephenmatheis"
                                target="_blank"
                            >
                                &gt; GITHUB
                            </Link>
                            <Link
                                href="https://codepen.io/stephenmatheis"
                                target="_blank"
                            >
                                # CODEPEN
                            </Link>
                        </menu>
                    </div>
                    <div className={styles.letter}>
                        <div className={styles.planet}>PLANET</div>
                        {/* prettier-ignore */}
                        <p className={styles.comment}>░  DEPARTURE MONO IS A<br />░  MONOSPACED PIXEL FONT WITH<br />░  A LO-FI TECHNICAL VIBE</p>
                        <div className={styles.brief}>BRIEF</div>
                        <div className={styles.clipping}>CLIPPING</div>
                        <div className={styles.paperclip}>PAPER CLIP</div>
                        <div className={styles.badge}>BADGE</div>
                        <div className={styles.highlighter}>HIGHLIGHTER</div>
                    </div>
                    {/* prettier-ignore */}
                    <pre className={styles.departures}>│ Flight  │ Destination ↑           │ Departing  │ Gate  │ Status       │<br/>├─────────┼─────────────────────────┼────────────┼───────┼──────────────┤<br/>│ LH789   │ EUR Europa 1            │ 13:45      │ Z23   │ Delayed      │<br/><span className={styles.blink}>│ XX123   │ KBA Kuiper Alpha        │ 08:00      │ 22    │ On Time      │</span><br/>│ AF321   │ MAR Mars Landing        │ 09:15      │ 12    │ On Time      │<br/>│ UA567   │ NTK New Tokyo           │ 11:20      │ C8    │ Departed     │<br/>│ QF678   │ ZMB Zvezda Moonbase     │ 20:00      │ 17    │ On Time      │</pre>
                    <div className={styles.ephemera}>
                        {/* prettier-ignore */}
                        <p className={styles.comment}>░  IT'S GREAT FOR WORKING<br />░  WITH TABULAR DATA</p>
                        <div className={styles.items}>
                            <div className={styles.pass}>BOARDING PASS</div>
                            <div className={styles.receipt}>RECEIPT</div>
                            <div className={styles.tag}>BAG TAG</div>
                        </div>
                    </div>
                    <div className={styles['type-samples']}>
                        <div
                            className={classNames(
                                styles['type-sample'],
                                styles['hidden-small']
                            )}
                            style={{ gap: 3, lineHeight: 1 }}
                        >
                            <div className={styles['type-sample-header']}>
                                <span>DEPARTURE MONO</span>
                                <span>121PX</span>
                                <span>-11PX TRACK</span>
                            </div>
                            <div
                                className={styles['type-sample-text']}
                                contentEditable
                                suppressContentEditableWarning={true}
                                spellCheck={false}
                                style={{ fontSize: 121, letterSpacing: -11 }}
                            >
                                ATTN: PASSENGERS QUIET IN THE CABIN
                            </div>
                        </div>
                        <div
                            className={styles['type-sample']}
                            style={{ gap: 13, lineHeight: 1 }}
                        >
                            <div className={styles['type-sample-header']}>
                                <span>DEPARTURE MONO</span>
                                <span>55PX</span>
                                <span>-5PX TRACK</span>
                            </div>
                            <div
                                className={styles['type-sample-text']}
                                contentEditable
                                suppressContentEditableWarning={true}
                                spellCheck={false}
                                style={{ fontSize: 55, letterSpacing: -5 }}
                            >
                                FLIGHT ATTENDANTS, PREPARE FOR TAKEOFF
                            </div>
                        </div>
                        <div
                            className={styles['type-sample']}
                            style={{ gap: 15, maxWidth: 1124 }}
                        >
                            <div className={styles['type-sample-header']}>
                                <span>DEPARTURE MONO</span>
                                <span>22PX</span>
                            </div>
                            <div
                                className={styles['type-sample-text']}
                                contentEditable
                                suppressContentEditableWarning={true}
                                spellCheck={false}
                                style={{ fontSize: 22 }}
                            >
                                DEPARTURE MONO IS A MONOSPACED PIXEL FONT
                                INSPIRED BY THE CONSTRAINTS OF EARLY
                                COMMAND-LINE AND GRAPHICAL USER INTERFACES, THE
                                TINY PIXEL FONTS OF THE LATE 90s/EARLY 00s, AND
                                SCI-FI CONCEPTS FROM FILM AND TELEVISION.
                            </div>
                        </div>
                        <div
                            className={styles['type-sample']}
                            style={{ gap: 16, maxWidth: 895 }}
                        >
                            <div className={styles['type-sample-header']}>
                                <span>DEPARTURE MONO</span>
                                <span>16.5PX</span>
                            </div>
                            <div
                                className={styles['type-sample-text']}
                                contentEditable
                                suppressContentEditableWarning={true}
                                spellCheck={false}
                                style={{ fontSize: 16.5 }}
                            >
                                Departure Mono is a monospaced pixel font
                                inspired by the constraints of early
                                command-line and graphical user interfaces, the
                                tiny pixel fonts of the late 90s/early 00s, and
                                sci-fi concepts from film and television.
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <ScrollJacked />
            <main>
                <div className={[styles['diagram1'], 'maxwidth'].join(' ')}>
                    {/* prettier-ignore */}
                    <p className={styles.comment}>
                        <span> ░  INCLUDED: BOX DRAWING</span>
                        <br />
                        <span> ░  CHARACTERS FOR YOUR</span>
                        <br />
                        <span> ░  PSEUDO-GRAPHICAL NEEDS</span>
                    </p>
                    <pre className={styles.proto}>
                        {` 0                   1                   2                   3   
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
├─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┼─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┤
│          Source Port          │        Destination Port       │
├───────────────────────────────┴───────────────────────────────┤
│                        Sequence Number                        │
├───────────────────────────────────────────────────────────────┤
│                     Acknowledgment Number                     │
├───────┬───────┬───────────────┬───────────────────────────────┤
│ Offset│  Res. │     Flags     │             Window            │
├───────┴───────┴───────────────┼───────────────────────────────┤
│            Checksum           │         Urgent Pointer        │
├───────────────────────────────┴───────────────┬───────────────┤
│                    Options                    │    Padding    │
└───────────────────────────────────────────────┴───────────────┘`}
                    </pre>
                    <pre className={styles.keeb}>
                        {`┌─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬───────────┐
│ esc │ f1  │ f2  │ f3  │ f4  │ f5  │ f6  │ f7  │ f8  │ f9  │ f10 │ f11 │ f12 │ power     │
├─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼───────────┤
│  ~  │  !  │  @  │  #  │  $  │  %  │  ^  │  &  │  *  │  (  │  )  │  _  │  +  │           │
│  \`  │  1  │  2  │  3  │  4  │  5  │  6  │  7  │  8  │  9  │  0  │  —  │  =  │ delete    │
├─────┴─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┬─────┤
│           │     │     │     │     │     │     │     │     │     │     │  {  │  }  │  |  │
│ tab       │  Q  │  W  │  E  │  R  │  T  │  Y  │  U  │  I  │  O  │  P  │  [  │  ]  │  \\  │
├───────────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┴─────┤
│           │     │     │     │     │     │     │     │     │     │  :  │  “  │           │
│ caps lock │  A  │  S  │  D  │  F  │  G  │  H  │  J  │  K  │  L  │  ;  │  '  │ enter     │
├───────────┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴───────────┤
│              │     │     │     │     │     │     │     │  <  │  >  │  ?  │              │
│ shift        │  Z  │  X  │  C  │  V  │  B  │  N  │  M  │  ,  │  .  │  /  │ shift        │
├─────┬──────┬─┴───┬─┴───┬─┴─────┴─────┴─────┴─────┴─────┼─────┼─────┼─────┴┬──────┬──────┤
│     │      │     │     │                               │     │     ├──────┼──────┼──────┤
│ fn  │ ctrl │ opt │ cmd │           s p a c e           │ cmd │ opt ├──────┼──────┼──────┤
└─────┴──────┴─────┴─────┴───────────────────────────────┴─────┴─────┴──────┴──────┴──────┘`}
                    </pre>
                </div>
                <Demo />
                <Code />
            </main>
        </div>
    );
}
