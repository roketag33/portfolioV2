'use client';



import { useState } from 'react';
import HoverPreview from '@/components/lab/HoverPreview';
import LabList from '@/components/lab/LabList';
import { Project } from '@/components/lab/types';

const EXPERIMENTS: Project[] = [
    {
        id: 'abstract-matter',
        title: 'Abstract Matter',
        description: 'Interactive 3D geometry and material distortion experiment.',
        year: '2025',
        tech: ['R3F', 'Shaders', 'Physics'],
        link: '/lab/3d-card',
        image: '/images/abstract-matter.webp', // Copied from artifacts
        color: '#6366f1' // Indigo
    },
    {
        id: 'echo-grid',
        title: 'Echo Grid',
        description: '3D spatial music sequencer with visual feedback.',
        year: '2025',
        tech: ['Tone.js', 'Three.js', 'React'],
        link: '/lab/echo',
        image: '/images/echo-grid.png',
        color: '#ec4899' // Pink
    },
    {
        id: 'lumina-canvas',
        title: 'Lumina Canvas',
        description: 'Generative particle art system with fluid dynamics.',
        year: '2025',
        tech: ['Canvas API', 'Physics', 'GenArt'],
        link: '/lab/lumina',
        image: '/images/lumina-canvas.png',
        color: '#06b6d4' // Cyan
    },
    {
        id: 'crypto-pulse',
        title: 'Crypto Pulse',
        description: 'Real-time cryptocurrency dashboard with glassmorphism.',
        year: '2025',
        tech: ['WebSocket', 'Recharts', 'Next.js'],
        link: '/lab/crypto',
        image: '/images/crypto-pulse.png',
        color: '#10b981' // Emerald
    },
    {
        id: 'knowledge-graph',
        title: '3D Knowledge Graph',
        description: 'Visualize Markdown notes as an interactive 3D force-directed universe.',
        year: '2025',
        tech: ['R3F', 'Force Graph', 'Markdown'],
        link: '/lab/neural',
        image: '/images/neural-nexus.png',
        color: '#818cf8' // Indigo
    },
    {
        id: 'gravity-playground',
        title: 'Gravity Playground',
        description: 'Interactive physics sandbox with dynamic gravity control.',
        year: '2025',
        tech: ['Cannon.js', 'React Physics', 'R3F'],
        link: '/lab/gravity',
        image: '/images/gravity-playground.png',
        color: '#f97316' // Orange
    },
    {
        id: 'neon-platformer',
        title: 'Neon Platformer',
        description: '2.5D Synthwave Platformer with physics.',
        year: '2025',
        tech: ['Rapier', 'Ecctrl', 'R3F'],
        link: '/lab/platformer',
        image: '/images/neon-platformer.png',
        color: '#2dd4bf' // Teal
    }
];

export default function LabPage() {
    const [hoveredProject, setHoveredProject] = useState<Project | null>(null);

    return (
        <main className="relative min-h-screen w-full bg-neutral-950 text-white overflow-x-hidden selection:bg-indigo-500/30 flex flex-col">
            {/* Background Preview */}
            <HoverPreview project={hoveredProject} />

            {/* List Content */}
            <div className="flex-grow">
                <LabList
                    projects={EXPERIMENTS}
                    setHoveredProject={setHoveredProject}
                />
            </div>


        </main>
    );
}
