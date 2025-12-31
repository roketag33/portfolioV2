import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "The Lab | Experimental Playground",
    description: "A digital playground for interactive experiments, 3D graphics, and creative coding.",
};

export default function LabLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
