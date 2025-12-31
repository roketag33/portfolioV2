import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact | Let's Talk",
    description: "Got a project in mind? Let's discuss your ideas. Open for freelance opportunites and consulting.",
};

export default function ContactLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
