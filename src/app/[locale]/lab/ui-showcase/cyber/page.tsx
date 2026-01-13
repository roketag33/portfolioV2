import { useTranslations } from 'next-intl';
import CyberDashboard from '@/components/lab/ui-showcase/CyberDashboard';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Cyber HUD - Lab',
    description: 'Futuristic UI Experiment',
};

export default function CyberPage() {
    return (
        <div className="w-full min-h-screen">
            <CyberDashboard />
        </div>
    );
}
