import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'Alexandre Sarrazin';
    const subtitle = searchParams.get('subtitle') || 'Senior Software Engineer & Architect';

    // You can also add more dynamic params like "category", "date", etc.

    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundImage: 'linear-gradient(to bottom right, #111111, #000000)',
                    fontFamily: 'sans-serif',
                }}
            >
                {/* Background Pattern */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: 'radial-gradient(circle at 25px 25px, #333 2%, transparent 0%), radial-gradient(circle at 75px 75px, #333 2%, transparent 0%)',
                        backgroundSize: '100px 100px',
                        opacity: 0.2,
                    }}
                />

                {/* Main Content */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        padding: '40px 80px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '20px',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
                    }}
                >
                    {/* Title */}
                    <div
                        style={{
                            fontSize: 70,
                            fontWeight: 900,
                            color: 'white',
                            lineHeight: 1.1,
                            marginBottom: 20,
                            backgroundImage: 'linear-gradient(90deg, #fff, #888)',
                            backgroundClip: 'text',
                            color: 'transparent',
                        }}
                    >
                        {title}
                    </div>

                    {/* Subtitle */}
                    <div
                        style={{
                            fontSize: 32,
                            fontWeight: 400,
                            color: '#888',
                            marginTop: 10,
                            letterSpacing: '0.05em',
                        }}
                    >
                        {subtitle}
                    </div>
                </div>

                {/* Footer / Branding */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: 50,
                        fontSize: 24,
                        color: '#444',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                    }}
                >
                    <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#22c55e' }} />
                    alexandresarrazin.fr
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        },
    );
}
