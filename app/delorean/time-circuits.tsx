'use client';

import { useEffect, useState } from 'react';
import { versionOnDate } from '../facts';
import { FittedFrame } from '../fitted-frame';
import { useIsClient } from '../use-is-client';
import { firstCommit, versions, versionUrl } from '../versions';
import styles from './time-circuits.module.css';

/**
 * The DeLorean's time circuits from Back to the Future.
 *
 * Three rows of glowing digits: where you're going (red), where you are
 * (green), and where you last left from (amber). Set a destination date, hit
 * 88 mph, and you arrive at whichever version was the newest on that date.
 *
 * This is the one view that navigates by date instead of by version number.
 */

type Moment = {
    /** YYYY-MM-DD */
    date: string;

    /** "01:21" style, 24-hour. */
    time: string;
};

/**
 * The first "last time departed" is the one from the movie: October 26,
 * 1985, 1:21 AM, when Marty first leaves the Twin Pines Mall parking lot.
 */
const firstDeparture: Moment = {
    date: '1985-10-26',
    time: '01:21',
};

/** How long the speedometer takes to climb to 88. */
const accelerationMilliseconds = 1600;

/** One row of the panel: month, day, year, AM/PM, hour, minute. */
function CircuitRow({
    label,
    moment,
    color,
}: {
    label: string;
    moment: Moment | null;
    color: 'red' | 'green' | 'amber';
}) {
    // The month is shown as a name (below), so its number is skipped here.
    const [year, , day] = moment ? moment.date.split('-') : ['----', '--', '--'];
    const [hours, minutes] = moment ? moment.time.split(':').map(Number) : [0, 0];
    const monthName = moment
        ? new Date(`${moment.date}T00:00:00Z`)
              .toLocaleString('en-US', { month: 'short', timeZone: 'UTC' })
              .toUpperCase()
        : '---';

    // The panel shows 12-hour time with separate AM and PM lights.
    const isPm = hours >= 12;
    const hour12 = hours % 12 === 0 ? 12 : hours % 12;

    return (
        <div className={styles.row} data-color={color}>
            <div className={styles.cells}>
                <Cell label="MONTH" value={monthName} />
                <Cell label="DAY" value={day} />
                <Cell label="YEAR" value={year} />
                <div className={styles.lights}>
                    <span data-on={(moment && !isPm) || undefined}>AM</span>
                    <span data-on={(moment && isPm) || undefined}>PM</span>
                </div>
                <Cell label="HOUR" value={moment ? String(hour12).padStart(2, '0') : '--'} />
                <Cell label="MIN" value={moment ? String(minutes).padStart(2, '0') : '--'} />
            </div>
            <div className={styles.rowLabel}>{label}</div>
        </div>
    );
}

function Cell({ label, value }: { label: string; value: string }) {
    return (
        <div className={styles.cell}>
            <span className={styles.cellLabel}>{label}</span>
            <span className={styles.digits}>{value}</span>
        </div>
    );
}

function nowMoment(): Moment {
    const now = new Date();

    return {
        date: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`,
        time: `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`,
    };
}

export function TimeCircuits() {
    const isClient = useIsClient();

    // Default destination: the day v1 froze, the start of the archive.
    const [destination, setDestination] = useState<Moment>({
        date: versions[0].frozen,
        time: '09:00',
    });
    const [lastDeparted, setLastDeparted] = useState<Moment>(firstDeparture);
    const [speed, setSpeed] = useState<number | null>(null);
    const [arrivedAt, setArrivedAt] = useState<string | null>(null);

    // The present, ticking once a minute. Client-only, since the server
    // doesn't know what time it is where you are.
    const [present, setPresent] = useState(nowMoment);

    useEffect(() => {
        const interval = window.setInterval(() => setPresent(nowMoment()), 30_000);

        return () => window.clearInterval(interval);
    }, []);

    // Accelerating: count the speedometer up to 88, then jump.
    useEffect(() => {
        if (speed === null) {
            return;
        }

        const timeout = window.setTimeout(() => {
            if (speed >= 88) {
                setSpeed(null);
                setArrivedAt(destination.date);
                setLastDeparted(present);
            } else {
                setSpeed(speed + 4);
            }
        }, accelerationMilliseconds / 22);

        return () => window.clearTimeout(timeout);
    }, [speed, destination.date, present]);

    const arrivedVersion = arrivedAt ? versionOnDate(arrivedAt) : null;
    const beforeTheArchive = arrivedAt !== null && arrivedAt < versions[0].frozen;

    return (
        <main className={styles.cockpit}>
            {arrivedVersion ? (
                <div className={styles.arrival}>
                    <p className={styles.arrivalText}>
                        {beforeTheArchive
                            ? `Arrived ${arrivedAt}. Nothing's archived yet, so you're parked at the earliest one: `
                            : `Arrived ${arrivedAt}. The newest version that day: `}
                        <a href={versionUrl(arrivedVersion)}>
                            v{arrivedVersion.number} · {arrivedVersion.name}
                        </a>
                        <button type="button" onClick={() => setArrivedAt(null)}>
                            ← back to the car
                        </button>
                    </p>
                    <div className={styles.arrivalScreen}>
                        <FittedFrame
                            key={arrivedVersion.number}
                            src={versionUrl(arrivedVersion)}
                            title={arrivedVersion.name}
                        />
                    </div>
                </div>
            ) : (
                <div className={styles.panel} data-accelerating={speed !== null || undefined}>
                    <CircuitRow label="DESTINATION TIME" moment={destination} color="red" />
                    <CircuitRow label="PRESENT TIME" moment={isClient ? present : null} color="green" />
                    <CircuitRow label="LAST TIME DEPARTED" moment={lastDeparted} color="amber" />

                    <div className={styles.controls}>
                        <label>
                            <span>SET DESTINATION</span>
                            <input
                                type="date"
                                value={destination.date}
                                min={firstCommit.date}
                                onChange={(event) =>
                                    event.target.value && setDestination({ ...destination, date: event.target.value })
                                }
                            />
                        </label>

                        <button
                            type="button"
                            className={styles.go}
                            disabled={speed !== null}
                            onClick={() => setSpeed(60)}
                        >
                            {speed === null ? 'HIT 88 MPH' : `${speed} MPH`}
                        </button>
                    </div>

                    <p className={styles.hint}>
                        The archive runs from {versions[0].frozen} to {versions[versions.length - 1].frozen}.
                    </p>
                </div>
            )}
        </main>
    );
}
