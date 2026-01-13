import { useTranslations } from 'next-intl';
import SmartHomeDashboard from '@/components/lab/ui-showcase/SmartHomeDashboard';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Smart Home OS - Lab',
    description: 'Bento Grid UI Experiment',
};

export default function BentoPage() {
    return (
        <div className="w-full min-h-screen">
            <SmartHomeDashboard />
        </div>
    );
}
