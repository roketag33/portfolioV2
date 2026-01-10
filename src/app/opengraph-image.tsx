import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Alexandre Sarrazin | Ingénieur Logiciel & Architecte'
export const size = {
    width: 1200,
    height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: 'linear-gradient(to bottom right, #0a0a0a, #1a1a1a)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'sans-serif',
                    color: 'white',
                    border: '20px solid #222',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '20px',
                    }}
                >
                    <div
                        style={{
                            fontSize: 60,
                            fontWeight: 900,
                            letterSpacing: '-0.05em',
                            background: 'linear-gradient(to right, #fff, #888)',
                            backgroundClip: 'text',
                            color: 'transparent',
                        }}
                    >
                        ALEXANDRE SARRAZIN
                    </div>
                    <div
                        style={{
                            fontSize: 30,
                            fontWeight: 300,
                            color: '#888',
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                        }}
                    >
                        Ingénieur Logiciel & Architecte
                    </div>
                    <div
                        style={{
                            marginTop: '40px',
                            padding: '10px 30px',
                            border: '1px solid #333',
                            borderRadius: '50px',
                            fontSize: 20,
                            color: '#666'
                        }}
                    >
                        alexandresarrazin.fr
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    )
}
