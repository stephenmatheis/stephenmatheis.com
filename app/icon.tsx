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
                d="M11 4H20V7H11V4ZM14 16H11V13H17V25H14V16ZM8 16H11V25H8V16ZM17 25H20V28H17V25ZM20 7H23V25H20V7ZM11 25H14V28H11V25ZM8 7H11V10H8V7Z"
                fill="black"
            />
        </svg>,
        {
            ...size,
        },
    );
}
