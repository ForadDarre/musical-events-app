import EventsClient from "./components/EventsClient";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function fetchWithCookies<T>(url: string): Promise<T | null> {
    const cookieStore = cookies();
    const cookieHeader = cookieStore
        .getAll()
        .map((c) => `${c.name}=${encodeURIComponent(c.value)}`)
        .join("; ");

    const res = await fetch(url, {
        headers: cookieHeader ? { Cookie: cookieHeader } : {},
        cache: "no-store",
    });

    if (!res.ok) {
        return null;
    }

    return (await res.json()) as T;
}

export default async function EventsPage() {
    const user = await fetchWithCookies<any>(
        "http://localhost:4000/api/users/me",
    );

    if (!user) {
        redirect("/");
    }

    const events =
        (await fetchWithCookies<any[]>(
            "http://localhost:4000/api/events/me",
        )) ?? [];

    return <EventsClient initialUser={user} initialEvents={events} />;
}
