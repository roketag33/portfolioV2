import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog | Thoughts & Insights",
    description: "Sharing insights on software architecture, design patterns, and fullstack engineering.",
};

export default function BlogLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
