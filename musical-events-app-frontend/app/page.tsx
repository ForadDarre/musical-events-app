import HomeClient from "./components/HomeClient";
import { cookies } from "next/headers";

async function getCurrentUser() {
    const cookieStore = cookies();
    const cookieHeader = cookieStore
        .getAll()
        .map((c) => `${c.name}=${encodeURIComponent(c.value)}`)
        .join("; ");

    try {
        const res = await fetch("http://localhost:4000/api/users/me", {
            headers: cookieHeader ? { Cookie: cookieHeader } : {},
            cache: "no-store",
        });

        if (!res.ok) {
            return null;
        }

        return (await res.json()) as any;
    } catch {
        return null;
    }
}

export default async function HomePage() {
    const user = await getCurrentUser();
    return <HomeClient initialUser={user} />;
}
