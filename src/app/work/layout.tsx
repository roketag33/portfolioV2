import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Work | Projects & Case Studies",
    description: "A collection of digital architectures and robust systems. Explore my projects in Web, Mobile, and IoT engineering.",
};

export default function WorkLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
