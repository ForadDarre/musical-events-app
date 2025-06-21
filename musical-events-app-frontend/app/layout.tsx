export const metadata = {
    title: "Musical Events",
    description: "Plan your musical days!",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body style={{ fontFamily: "Arial, sans-serif", padding: "2rem" }}>
                {children}
            </body>
        </html>
    );
}
