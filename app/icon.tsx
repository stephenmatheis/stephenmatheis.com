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
                d="M11 11.5H12.5V14.5H11V11.5ZM6.5 20.5H8V23.5H6.5V20.5ZM8 17.5H9.5V20.5H8V17.5ZM9.5 14.5H11V17.5H9.5V14.5ZM12.5 8.5H14V11.5H12.5V8.5ZM20.0059 10H21.5059V13H23.0059V14.5H21.5059V17.5H20.0059V14.5H18.5059V13H20.0059V10ZM18.5059 13H17.0059V11.5H18.5059V13ZM17.0059 14.5H18.5059V16H17.0059V14.5ZM23.0059 11.5H24.5059V13H23.0059V11.5ZM23.0059 14.5H24.5059V16H23.0059V14.5Z"
                fill="black"
            />
        </svg>,
        {
            ...size,
        },
    );
}
