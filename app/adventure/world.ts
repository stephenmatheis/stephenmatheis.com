import { effort, isUnfinished, lastWords, parseFramework } from '../facts';
import { versions, type Version } from '../versions';

/**
 * The world of the text adventure: a row of rooms, one per year, with the
 * versions from that year sitting in them like objects in Zork.
 *
 *   porch ⇄ 2023 ⇄ 2024 ⇄ 2025 ⇄ 2026
 *
 * The descriptions are written from the data, so a year with lots of WIP
 * versions feels messier and one with a framework switch mentions it.
 */

export type Room = {
    id: string;
    title: string;
    description: string;
    versions: Version[];
    west?: string;
    east?: string;
};

const years = [...new Set(versions.map((version) => version.frozen.slice(0, 4)))];

function describeYear(year: string, inYear: Version[]) {
    const frameworks = [...new Set(inYear.map((version) => version.framework))];
    const families = new Set(frameworks.map((framework) => parseFramework(framework).family));
    const unfinished = inYear.filter(isUnfinished).length;

    const sentences = [`This room is labeled ${year}. ${inYear.length} versions are kept here.`];

    if (families.size > 1) {
        sentences.push(`The floor is scuffed where someone tried ${[...families].join(' and ')} in the same year.`);
    } else {
        sentences.push(`Everything smells faintly of ${frameworks.join(', ')}.`);
    }

    if (unfinished >= 3) {
        sentences.push(`Half-finished projects lean against every wall. ${unfinished} of them are tagged WIP.`);
    } else if (unfinished > 0) {
        sentences.push(`A few projects look abandoned mid-thought.`);
    } else {
        sentences.push('It is surprisingly tidy.');
    }

    return sentences.join(' ');
}

export const rooms: Room[] = [
    {
        id: 'porch',
        title: 'Front Porch',
        description:
            'You are standing on the front porch of a website. The door has been repainted more times than you can count. A path leads east, into the past, one year at a time.',
        versions: [],
        east: years[0],
    },
    ...years.map((year, index) => {
        const inYear = versions.filter((version) => version.frozen.startsWith(year));

        return {
            id: year,
            title: year,
            description: describeYear(year, inYear),
            versions: inYear,
            west: index === 0 ? 'porch' : years[index - 1],
            east: years[index + 1],
        };
    }),
];

export function roomById(id: string) {
    return rooms.find((room) => room.id === id)!;
}

/**
 * Finds a version by what the player typed: "v14", "14", or part of its
 * name ("cyber" finds Cybertruck). Only versions in the current room count,
 * like objects in a real adventure game.
 */
export function findVersion(room: Room, words: string[]) {
    const phrase = words.join(' ').toLowerCase().trim();

    if (!phrase) {
        return undefined;
    }

    const number = Number(phrase.replace(/^v/, ''));

    return room.versions.find((version) => version.number === number || version.name.toLowerCase().includes(phrase));
}

export function examine(version: Version) {
    return [
        `v${version.number}, ${version.name}. Built with ${version.framework}.`,
        `Someone worked on it from ${version.started} to ${version.frozen}: ${effort(version)}.`,
        isUnfinished(version) ? 'It was never finished.' : 'It seems complete enough.',
        `Scratched into the side: "${lastWords(version)}"`,
    ];
}
