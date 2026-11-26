import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';

export const size = {
    width: 32,
    height: 32,
};

export const contentType = 'image/png';

export default function Icon() {
    return new ImageResponse(
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M10 10H12V12H10V10ZM14 10H12V8H14V10ZM14 10H16V12H14V10ZM18 22H16V20H18V22ZM18 22H20V24H18V22ZM18 18H20V20H18V18ZM20 20H22V22H20V20ZM18 12H20V14H18V12ZM14 16H16V18H14V16ZM12 18H14V20H12V18ZM20 8H22V12H20V8ZM16 14H18V16H16V14ZM10 20H12V24H10V20ZM12 12H14V14H12V12Z"
                fill="black"
            />
        </svg>,
        {
            ...size,
        },
    );
}
