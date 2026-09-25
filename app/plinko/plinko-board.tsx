'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { playClick } from '../audio';
import { versions, versionShot, versionUrl, type Version } from '../versions';
import styles from './plinko-board.module.css';

/**
 * Plinko: drop a ball from the top, watch it bounce down through the pegs,
 * and whichever of the 42 slots it lands in picks a version.
 *
 * Roulette with physics. The simulation is tiny and hand-rolled:
 *
 * - Every frame, gravity adds a little to the ball's downward speed, and the
 *   ball moves by its speed.
 * - If the ball overlaps a peg, it's pushed back out along the line between
 *   their centers (the "normal"), and the part of its velocity heading into
 *   the peg is reversed and weakened. That's a bounce.
 * - A tiny random nudge on each bounce keeps a ball from balancing forever
 *   on top of a peg, which a perfect simulation would happily allow.
 *
 * Click above the pegs to drop there, or press Space to drop at random.
 */

// The board's drawing size. CSS scales the canvas to fit the screen.
const width = 882;
const height = 640;
const slotWidth = width / versions.length;
const slotHeight = 70;

const ballRadius = 5;
const pegRadius = 2.5;
const gravity = 0.18;
const bounciness = 0.45;

type Ball = { x: number; y: number; velocityX: number; velocityY: number; landed: boolean };

/**
 * Peg positions: staggered rows, every other row shifted half a gap, so a
 * ball can't fall straight through. The gap between pegs equals one slot,
 * which lets a ball end up in any slot.
 */
const pegs = (() => {
    const positions: { x: number; y: number }[] = [];
    const rowGap = 30;

    for (let row = 0, y = 90; y < height - slotHeight - 20; row++, y += rowGap) {
        const offset = row % 2 === 0 ? slotWidth / 2 : slotWidth;

        for (let x = offset; x < width; x += slotWidth) {
            // Skip pegs so close to a wall that the gap is narrower than the
            // ball. A ball could drop into that gap and wedge there forever.
            const roomToWall = Math.min(x, width - x) - pegRadius;

            if (roomToWall > ballRadius * 2 + 1) {
                positions.push({ x, y });
            }
        }
    }

    return positions;
})();

/** One step of the simulation for one ball. Returns the slot if it just landed. */
function step(ball: Ball): number | null {
    if (ball.landed) {
        return null;
    }

    ball.velocityY += gravity;
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    // Bounce off the side walls.
    if (ball.x < ballRadius || ball.x > width - ballRadius) {
        ball.x = Math.min(Math.max(ball.x, ballRadius), width - ballRadius);
        ball.velocityX *= -bounciness;
    }

    for (const peg of pegs) {
        const deltaX = ball.x - peg.x;
        const deltaY = ball.y - peg.y;
        const distance = Math.hypot(deltaX, deltaY);
        const minimum = ballRadius + pegRadius;

        if (distance >= minimum || distance === 0) {
            continue;
        }

        // The normal: a length-1 arrow pointing from the peg to the ball.
        const normalX = deltaX / distance;
        const normalY = deltaY / distance;

        // Push the ball out so they just touch.
        ball.x = peg.x + normalX * minimum;
        ball.y = peg.y + normalY * minimum;

        // How fast the ball is moving into the peg. Only bounce if it's
        // moving toward it, not already moving away.
        const speedIntoPeg = ball.velocityX * normalX + ball.velocityY * normalY;

        if (speedIntoPeg < 0) {
            ball.velocityX -= (1 + bounciness) * speedIntoPeg * normalX;
            ball.velocityY -= (1 + bounciness) * speedIntoPeg * normalY;
            ball.velocityX += (Math.random() - 0.5) * 0.6;
        }
    }

    // Into the slots: settle at the bottom, and report which slot.
    if (ball.y > height - ballRadius) {
        ball.y = height - ballRadius;
        ball.landed = true;

        return Math.min(versions.length - 1, Math.floor(ball.x / slotWidth));
    }

    // Inside the slot area, the dividers keep the ball in its lane.
    if (ball.y > height - slotHeight) {
        const lane = Math.floor(ball.x / slotWidth);
        const left = lane * slotWidth + ballRadius;
        const right = (lane + 1) * slotWidth - ballRadius;

        ball.x = Math.min(Math.max(ball.x, left), right);
        ball.velocityX *= 0.5;
    }

    return null;
}

export function PlinkoBoard() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const balls = useRef<Ball[]>([]);
    const [winner, setWinner] = useState<Version | null>(null);

    // The simulation lives in refs and a canvas, outside React. Updating
    // React state 60 times a second for every ball would be slow; only the
    // result (which slot won) goes through state.
    const winnerSlot = useRef<number | null>(null);

    function drop(x: number) {
        balls.current.push({
            x: Math.min(Math.max(x, ballRadius), width - ballRadius),
            y: 20,
            velocityX: (Math.random() - 0.5) * 0.8,
            velocityY: 0,
            landed: false,
        });

        // Keep the board from filling up with old balls.
        balls.current = balls.current.slice(-12);
    }

    function handlePointerDown(event: PointerEvent<HTMLCanvasElement>) {
        // The canvas may be drawn smaller than its real size, so convert the
        // click from screen pixels to board pixels.
        const rect = event.currentTarget.getBoundingClientRect();

        drop(((event.clientX - rect.left) / rect.width) * width);
    }

    useEffect(() => {
        const context = canvasRef.current?.getContext('2d');

        if (!context) {
            return;
        }

        let frame = 0;

        function draw() {
            context!.clearRect(0, 0, width, height);

            // Slots, with the winning one lit.
            for (let slot = 0; slot < versions.length; slot++) {
                const x = slot * slotWidth;

                context!.fillStyle = slot === winnerSlot.current ? '#ffd166' : slot % 2 === 0 ? '#243b55' : '#1d314a';
                context!.fillRect(x, height - slotHeight, slotWidth, slotHeight);

                context!.save();
                context!.translate(x + slotWidth / 2 + 3, height - 8);
                context!.rotate(-Math.PI / 2);
                context!.fillStyle = slot === winnerSlot.current ? '#1b1b1b' : '#9fb3c8';
                context!.font = '10px ui-monospace, monospace';
                context!.fillText(String(slot + 1), 0, 0);
                context!.restore();
            }

            context!.fillStyle = '#cfd8e3';

            for (const peg of pegs) {
                context!.beginPath();
                context!.arc(peg.x, peg.y, pegRadius, 0, Math.PI * 2);
                context!.fill();
            }

            for (const ball of balls.current) {
                const landedIn = step(ball);

                if (landedIn !== null) {
                    winnerSlot.current = landedIn;
                    setWinner(versions[landedIn]);
                    playClick({ pitch: 700, volume: 0.4, length: 0.08 });
                }

                context!.fillStyle = '#ff6b6b';
                context!.beginPath();
                context!.arc(ball.x, ball.y, ballRadius, 0, Math.PI * 2);
                context!.fill();
            }

            frame = requestAnimationFrame(draw);
        }

        draw();

        return () => cancelAnimationFrame(frame);
    }, []);

    // Space drops a ball somewhere random.
    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === ' ') {
                event.preventDefault();
                drop(Math.random() * width);
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <main className={styles.arcade}>
            <canvas
                ref={canvasRef}
                className={styles.board}
                width={width}
                height={height}
                onPointerDown={handlePointerDown}
                aria-label="Plinko board. Click to drop a ball, or press Space."
            />

            <aside className={styles.result} aria-live="polite">
                {winner ? (
                    <>
                        <div className={styles.shot}>
                            <Image src={versionShot(winner)} alt="" fill sizes="280px" />
                        </div>
                        <p>
                            Slot {winner.number}:{' '}
                            <a href={versionUrl(winner)}>
                                v{winner.number} · {winner.name} →
                            </a>
                        </p>
                    </>
                ) : (
                    <p>Click anywhere above the pegs to drop a ball, or press Space.</p>
                )}
            </aside>
        </main>
    );
}
