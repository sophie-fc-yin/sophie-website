import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Sophie Yin — AI Systems for Creators and Digital Media';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a0a0a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
        }}
      >
        <div
          style={{
            fontSize: 60,
            fontWeight: 700,
            color: '#f0f0f0',
            marginBottom: 20,
          }}
        >
          Sophie Yin
        </div>
        <div
          style={{
            fontSize: 28,
            color: '#00d4aa',
            textAlign: 'center',
          }}
        >
          AI Systems for Creators and Digital Media
        </div>
      </div>
    ),
    { ...size }
  );
}
