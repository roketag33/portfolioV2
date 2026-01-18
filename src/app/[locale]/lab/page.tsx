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
        image: '/images/lab-previews/perfect-circle.png',
        color: '#22c55e'
    },
    {
        id: 'fractal-garden',
        year: '2025',
        tech: ['Recursion', 'Canvas', 'Maths'],
        link: '/lab/fractal',
        image: '/images/lab-previews/fractal-garden.png',
        color: '#f472b6'
    },
    {
        id: 'retro-snake',
        year: '2025',
        tech: ['Game Loop', 'React', 'CRDT'],
        link: '/lab/snake',
        image: '/images/lab-previews/retro-snake.png',
        color: '#eab308'
    },
    {
        id: 'typing-racer',
        year: '2025',
        tech: ['React', 'State Management', 'Typing'],
        link: '/lab/typing-racer',
        image: '/images/lab-previews/typing-racer.png',
        color: '#a78bfa'
    },
    {
        id: 'button-showcase',
        year: '2025',
        tech: ['Framer Motion', 'UI/UX', 'Components'],
        link: '/lab/buttons',
        image: '/images/lab-previews/button-showcase.png',
        color: '#6366f1'
    },
    {
        id: 'text-effects',
        year: '2025',
        tech: ['Typography', 'Framer Motion', 'Stagger'],
        link: '/lab/text-effects',
        image: '/images/lab-previews/text-effects.png',
        color: '#14b8a6'
    },
    {
        id: 'scroll-triggers',
        year: '2025',
        tech: ['Scroll', 'Parallax', 'Sticky'],
        link: '/lab/scroll-triggers',
        image: '/images/lab-previews/scroll-triggers.png',
        color: '#f43f5e'
    },
    {
        id: 'ui-showcase',
        year: '2025',
        tech: ['UI', 'Components', 'Animations'],
        link: '/lab/ui-showcase',
        image: '/images/lab-previews/ui-showcase.png',
        color: '#0ea5e9'
    },
    {
        id: 'galaxy-chaos',
        year: '2026',
        tech: ['R3F', 'InstancedMesh', 'Physics'],
        link: '/lab/galaxy-chaos',
        image: '/images/lab-previews/galaxy-chaos.png',
        color: '#8b5cf6'
    },
    {
        id: 'abstract-matter',
        year: '2025',
        tech: ['R3F', 'Shaders', 'Physics'],
        link: '/lab/3d-card',
        image: '/images/lab-previews/abstract-matter.png',
        color: '#6366f1'
    },
    {
        id: 'echo-grid',
        year: '2025',
        tech: ['Tone.js', 'Three.js', 'React'],
        link: '/lab/echo',
        image: '/images/lab-previews/echo-grid.png',
        color: '#ec4899'
    },
    {
        id: 'lumina-canvas',
        year: '2025',
        tech: ['Canvas API', 'Physics', 'GenArt'],
        link: '/lab/lumina',
        image: '/images/lab-previews/lumina-canvas.png',
        color: '#06b6d4'
    },
    {
        id: 'crypto-pulse',
        year: '2025',
        tech: ['WebSocket', 'Recharts', 'Next.js'],
        link: '/lab/crypto',
        image: '/images/lab-previews/crypto-pulse.png',
        color: '#10b981'
    },
    {
        id: 'knowledge-graph',
        year: '2025',
        tech: ['R3F', 'Force Graph', 'Markdown'],
        link: '/lab/neural',
        image: '/images/lab-previews/knowledge-graph.png',
        color: '#818cf8'
    },
    {
        id: 'gravity-playground',
        year: '2025',
        tech: ['Cannon.js', 'React Physics', 'R3F'],
        link: '/lab/gravity',
        image: '/images/lab-previews/gravity-playground.png',
        color: '#f97316'
    },
    {
        id: 'neon-platformer',
        year: '2025',
        tech: ['Rapier', 'Ecctrl', 'R3F'],
        link: '/lab/platformer',
        image: '/images/lab-previews/neon-platformer.png',
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
