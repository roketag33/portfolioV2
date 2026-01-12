'use client';



import { useState } from 'react';
import HoverPreview from '@/components/lab/HoverPreview';
import LabList from '@/components/lab/LabList';
import { Project } from '@/components/lab/types';
import { useTranslations } from 'next-intl';

const LAB_ITEMS = [
    {
        id: 'perfect-circle',
        year: '2026',
        tech: ['Canvas API', 'Maths', 'Framer Motion'],
        link: '/lab/perfect-circle',
        image: '/images/lumina-canvas.png', // Placeholder
        color: '#22c55e'
    },
    {
        id: 'fractal-garden',
        year: '2025',
        tech: ['Recursion', 'Canvas', 'Maths'],
        link: '/lab/fractal',
        image: '/images/abstract-matter.webp', // Placeholder
        color: '#f472b6'
    },
    {
        id: 'retro-snake',
        year: '2025',
        tech: ['Game Loop', 'React', 'CRDT'],
        link: '/lab/snake',
        image: '/images/neon-platformer.png', // Placeholder
        color: '#eab308'
    },
    {
        id: 'typing-racer',
        year: '2025', // Assuming year based on other items
        tech: ['React', 'State Management', 'Typing'], // Placeholder tech
        link: '/lab/typing-racer', // Placeholder link
        image: '/images/typing-racer.png', // Placeholder image
        color: '#a78bfa' // Placeholder color
    },
    {
        id: 'galaxy-chaos',
        year: '2026',
        tech: ['R3F', 'InstancedMesh', 'Physics'],
        link: '/lab/galaxy-chaos',
        image: '/images/abstract-matter.webp', // Placeholder
        color: '#8b5cf6'
    },
    {
        id: 'abstract-matter',
        year: '2025',
        tech: ['R3F', 'Shaders', 'Physics'],
        link: '/lab/3d-card',
        image: '/images/abstract-matter.webp',
        color: '#6366f1'
    },
    {
        id: 'echo-grid',
        year: '2025',
        tech: ['Tone.js', 'Three.js', 'React'],
        link: '/lab/echo',
        image: '/images/echo-grid.png',
        color: '#ec4899'
    },
    {
        id: 'lumina-canvas',
        year: '2025',
        tech: ['Canvas API', 'Physics', 'GenArt'],
        link: '/lab/lumina',
        image: '/images/lumina-canvas.png',
        color: '#06b6d4'
    },
    {
        id: 'crypto-pulse',
        year: '2025',
        tech: ['WebSocket', 'Recharts', 'Next.js'],
        link: '/lab/crypto',
        image: '/images/crypto-pulse.png',
        color: '#10b981'
    },
    {
        id: 'knowledge-graph',
        year: '2025',
        tech: ['R3F', 'Force Graph', 'Markdown'],
        link: '/lab/neural',
        image: '/images/neural-nexus.png',
        color: '#818cf8'
    },
    {
        id: 'gravity-playground',
        year: '2025',
        tech: ['Cannon.js', 'React Physics', 'R3F'],
        link: '/lab/gravity',
        image: '/images/gravity-playground.png',
        color: '#f97316'
    },
    {
        id: 'neon-platformer',
        year: '2025',
        tech: ['Rapier', 'Ecctrl', 'R3F'],
        link: '/lab/platformer',
        image: '/images/neon-platformer.png',
        color: '#2dd4bf'
    }
];

export default function LabPage() {
    const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
    const t = useTranslations('Lab');

    const projects: Project[] = LAB_ITEMS.map(item => ({
        ...item,
        title: t(`${item.id}.title`),
        description: t(`${item.id}.description`)
    }));

    return (
        <main className="relative min-h-screen w-full bg-neutral-950 text-white overflow-x-hidden selection:bg-indigo-500/30 flex flex-col">
            {/* Background Preview */}
            <HoverPreview project={hoveredProject} />

            {/* List Content */}
            <div className="flex-grow">
                <LabList
                    projects={projects}
                    setHoveredProject={setHoveredProject}
                />
            </div>
        </main>
    );
}
