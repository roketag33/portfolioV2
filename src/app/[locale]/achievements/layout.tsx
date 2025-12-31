import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Achievements | Trophy Room",
    description: "Track your progress and unlock secret achievements as you explore the portfolio.",
};

export default function AchievementsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
