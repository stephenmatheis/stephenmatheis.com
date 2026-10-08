import { ImageResponse } from "next/og";

export const size = {
    width: 32,
    height: 32,
};

export const contentType = "image/png";

export default function Icon() {
    return new ImageResponse(
        <svg
            width={size.width}
            height={size.height}
            viewBox="0 0 32 32"
            style={{
                backgroundColor: "#000000",
            }}
        />,
        {
            ...size,
        },
    );
}
