'use client';

import { CSSProperties } from 'react';

const codeBlock = `/* 
    Write a program that prints the numbers from 1 to 100.
    But for multiples of three print “Fizz” instead of the
    number and for the multiples of five print “Buzz”.
    For numbers which are multiples of both three and five
    print “FizzBuzz”.
*/

function fizzBuzz() {
    console.log('Results\\n-------\\n\\n');

    for (let i = 1; i <= 100; i++) {
        if (i % 3 === 0 && i % 5 === 0) {
            console.log('FizzBuzz');
        } else if (i % 3 === 0) {
            console.log('Fizz');
        } else if (i % 5 === 0) {
            console.log('Buzz');
        } else {
            console.log(i);
        }
    }
}
`;

function Gutter({ length }: { length: number }) {
    return (
        <div className="line-numbers">
            {Array.from({ length }, (_, index) => (
                <div key={index} className="line-number">
                    {index + 1}
                </div>
            ))}
        </div>
    );
}

function Block({ text, gutter = true, play = false }: { text: string; gutter?: boolean; play?: boolean }) {
    if (gutter) {
        const lineNumbers = text.split('\n').length;
        const gutterWidth = lineNumbers.toString().length;

        return (
            <pre className="gutter" style={{ '--gutter-width': `${gutterWidth}ch` } as CSSProperties}>
                <Gutter length={lineNumbers} />
                <code>{text}</code>
            </pre>
        );
    }

    if (play) {
        return (
            <pre className="play">
                {play && <span className="play">▷</span>}
                <code>{text}</code>
            </pre>
        );
    }

    return (
        <pre>
            <code>{text}</code>
        </pre>
    );
}

export default function Home() {
    return (
        <>
            <Block text={codeBlock} />
        </>
    );
}
