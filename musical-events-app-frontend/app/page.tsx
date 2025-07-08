import Link from "next/link";

export default function HomePage() {
    return (
        <main style={{ maxWidth: 600, margin: "0 auto" }}>
            <h1>
                🎶 Welcome to the Musical Events app! To check your calendar,
                click the button below:
            </h1>
            <Link
                href="/events"
                style={{
                    marginTop: "1rem",
                    display: "inline-block",
                    padding: "0.5rem 1rem",
                    backgroundColor: "#0070f3",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    textDecoration: "none",
                    cursor: "pointer",
                }}
            >
                Manage Events
            </Link>
        </main>
    );
}
