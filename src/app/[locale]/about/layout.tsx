import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About",
    description: "Discover my journey from freelance developer to software architect. 5 years of experience in Fullstack, Mobile, and IoT.",
};

export default function AboutLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
