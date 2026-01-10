'use client';



import { useState } from 'react';
import HoverPreview from '@/components/lab/HoverPreview';
import LabList from '@/components/lab/LabList';
import { Project } from '@/components/lab/types';
import { useTranslations } from 'next-intl';

const LAB_ITEMS = [
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
