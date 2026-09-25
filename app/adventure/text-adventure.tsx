'use client';

import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { versionUrl } from '../versions';
import { examine, findVersion, roomById, rooms, type Room } from './world';
import styles from './text-adventure.module.css';

/**
 * A text adventure in the style of Zork: you read a description, type what
 * to do ("go east", "examine cybertruck"), and the game answers in prose.
 *
 * The rooms are years, and the versions from each year are the objects in
 * the room. `enter` a version to actually visit it.
 *
 * The parser is deliberately simple: the first word is the verb, the rest
 * is the object, plus a few one-word shortcuts like "e" for "go east".
 */

function lookAround(room: Room) {
    const lines = [room.title, room.description];

    if (room.versions.length > 0) {
        lines.push(`You see: ${room.versions.map((version) => `v${version.number} ${version.name}`).join(', ')}.`);
    }

    const exits = [room.west && 'west', room.east && 'east'].filter(Boolean);

    lines.push(`Exits: ${exits.join(', ')}.`);

    return lines;
}

const help = [
    'Things you can say:',
    '  look (l)                  describe the room',
    '  go east / go west (e, w)  move between years',
    '  examine <version> (x)     look closely, e.g. "x cybertruck" or "x 16"',
    '  enter <version>           go inside and visit it',
    '  take <version>, inventory (i), wait (z), score, help',
];

type Line = {
    id: number;
    text: string;
    kind: 'input' | 'output';
};

export function TextAdventure() {
    const [roomId, setRoomId] = useState('porch');
    const [visited, setVisited] = useState(() => new Set(['porch']));
    const [lines, setLines] = useState<Line[]>(() =>
        [
            'STEPHENMATHEIS.COM: A Web Adventure',
            '',
            ...lookAround(roomById('porch')),
            '',
            'Type "help" if you get lost.',
        ].map((text, index) => ({ id: index, text, kind: 'output' })),
    );
    const [input, setInput] = useState('');

    const nextId = useRef(1000);
    const bottomRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ block: 'end' });
    }, [lines]);

    function say(...texts: string[]) {
        setLines((existing) => [
            ...existing,
            ...texts.map((text) => ({ id: nextId.current++, text, kind: 'output' as const })),
        ]);
    }

    function move(direction: 'east' | 'west') {
        const room = roomById(roomId);
        const destination = room[direction];

        if (!destination) {
            say(
                direction === 'east'
                    ? 'The future is not built yet. You can go no further east.'
                    : 'There is only the road behind you.',
            );

            return;
        }

        setRoomId(destination);
        setVisited((current) => new Set(current).add(destination));
        say('', ...lookAround(roomById(destination)));
    }

    function run(command: string) {
        setLines((existing) => [...existing, { id: nextId.current++, text: `> ${command}`, kind: 'input' }]);

        const words = command.toLowerCase().trim().split(/\s+/).filter(Boolean);
        const [verb, ...rest] = words;
        const room = roomById(roomId);

        // "go east" and "east" both mean east.
        const direction = verb === 'go' ? rest[0] : verb;

        switch (verb) {
            case undefined:
                return;

            case 'look':
            case 'l':
                say(...lookAround(room));
                return;

            case 'go':
            case 'east':
            case 'e':
            case 'west':
            case 'w':
                if (direction === 'east' || direction === 'e') {
                    move('east');
                } else if (direction === 'west' || direction === 'w') {
                    move('west');
                } else {
                    say('You can only go east or west. Time is linear, mostly.');
                }

                return;

            case 'examine':
            case 'x':
            case 'inspect': {
                const version = findVersion(room, rest);

                say(...(version ? examine(version) : [`You don't see "${rest.join(' ')}" here.`]));
                return;
            }

            case 'enter':
            case 'open':
            case 'visit': {
                const version = findVersion(room, rest);

                if (!version) {
                    say(`There's no "${rest.join(' ')}" here to enter.`);
                    return;
                }

                say(`You step inside v${version.number}…`);
                window.setTimeout(() => window.location.assign(versionUrl(version)), 700);
                return;
            }

            case 'take':
            case 'get': {
                const version = findVersion(room, rest);

                say(version ? `You can't take v${version.number}. It's still running.` : 'Take what?');
                return;
            }

            case 'inventory':
            case 'i':
                say('You are carrying: a lot of unfinished ideas, and a strong opinion about fonts.');
                return;

            case 'wait':
            case 'z':
                say('Time passes. Another redesign idea occurs to you.');
                return;

            case 'score':
                say(`You have explored ${visited.size} of ${rooms.length} rooms.`);
                return;

            case 'xyzzy':
                say('A hollow voice says "Fool."');
                return;

            case 'help':
            case '?':
                say(...help);
                return;

            default:
                say(`I don't know the word "${verb}".`);
        }
    }

    function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            run(input);
            setInput('');
        }
    }

    return (
        // Clicking anywhere puts the cursor back in the input, like the ssh
        // view. It's a mouse shortcut only; keyboard users are already there.
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
        <main className={styles.monitor} onClick={() => inputRef.current?.focus()}>
            <div className={styles.screen}>
                {lines.map((line) => (
                    <div key={line.id} className={line.kind === 'input' ? styles.input : undefined}>
                        {line.text || ' '}
                    </div>
                ))}

                <label className={styles.prompt}>
                    <span>&gt;</span>
                    <input
                        ref={inputRef}
                        value={input}
                        onChange={(event) => setInput(event.target.value)}
                        onKeyDown={handleKeyDown}
                        aria-label="Command"
                        autoComplete="off"
                        autoCapitalize="off"
                        spellCheck={false}
                        // The whole page is the game, and typing is how you play.
                        // eslint-disable-next-line jsx-a11y/no-autofocus
                        autoFocus
                    />
                </label>

                <div ref={bottomRef} />
            </div>
        </main>
    );
}
