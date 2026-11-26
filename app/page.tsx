'use client';

import { CSSProperties } from 'react';

const pageCode = `/* 
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
        }
    }
}

fizzBuzz();
`;

const lineNumbers = pageCode.split('\n').length;
const gutterWidth = lineNumbers.toString().length;

function fizzBuzzForLoop() {
    let html = `Results\n-------\n\n`;

    // for (let i = 1; i <= 100; i++) {
    //     html += `${i}. `;

    //     if (i % 3 === 0 && i % 5 === 0) {
    //         html += `FizzBuzz (${i} is a multiple of 3 and 5)`;
    //     } else if (i % 3 === 0) {
    //         html += `Fizz (${i} is a multiple of 3 but not 5)`;
    //     } else if (i % 5 === 0) {
    //         html += `Buzz (${i} is a multiple of 5 but not 3)`;
    //     }

    //     html += `\n`;
    // }

    for (let i = 1; i <= 100; i++) {
        if (i % 3 === 0 && i % 5 === 0) {
            html += 'FizzBuzz';
        } else if (i % 3 === 0) {
            html += 'Fizz';
        } else if (i % 5 === 0) {
            html += 'Buzz';
        } else {
            html += i;
        }

        html += `\n`;
    }

    return html;
}

export default function Home() {
    return (
        <>
            <pre className="gutter" style={{ '--gutter-width': `${gutterWidth}ch` } as CSSProperties}>
                <div className="line-numbers">
                    {Array.from({ length: lineNumbers }, (_, index) => (
                        <div key={index} className="line-number">
                            {index + 1}
                        </div>
                    ))}
                </div>
                <code>{pageCode}</code>
            </pre>
            <br />
            <pre>
                <code>{fizzBuzzForLoop()}</code>
            </pre>
        </>
    );
}
