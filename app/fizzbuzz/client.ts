'use client';

import { useEffect } from 'react';
import { fizzBuzz } from './fizzbuzz';

export function Client() {
    useEffect(() => {
        const win = window as Window & { fizzBuzz?: typeof fizzBuzz };
        win.fizzBuzz = fizzBuzz;

        return () => {
            delete win.fizzBuzz;
        };
    }, []);

    return null;
}
