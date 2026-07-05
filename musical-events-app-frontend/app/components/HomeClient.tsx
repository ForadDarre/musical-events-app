"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoginModal from "./LoginModal";
import type { User } from "../types/types";

interface HomeClientProps {
    initialUser: User | null;
}

export default function HomeClient({ initialUser }: HomeClientProps) {
    const router = useRouter();
    const [loginOpen, setLoginOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState<User | null>(initialUser);

    const handleLoginSuccess = (user: User) => {
        setCurrentUser(user);
        router.push("/events");
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-white px-4 py-8 sm:py-12">
            <div className="w-full max-w-xl rounded-3xl bg-[#264653] text-white shadow-2xl p-8 sm:p-10 flex flex-col gap-6">
                <div className="space-y-3">
                    <h1 className="text-2xl sm:text-3xl font-bold leading-snug">
                        🎶 Welcome to the Musical Events app!
                    </h1>
                    <p className="text-sm sm:text-base text-gray-100">
                        Plan your musical journey, keep track of your events,
                        and stay organised with your personal calendar.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
                    <button
                        type="button"
                        onClick={() => router.push("/events")}
                        className="inline-flex justify-center items-center rounded-full bg-[#6ec475] px-5 py-2.5 text-sm sm:text-base font-semibold text-[#264653] shadow-md hover:bg-emerald-400 transition-colors"
                    >
                        Manage events
                    </button>
                    <button
                        type="button"
                        onClick={() => setLoginOpen(true)}
                        className="inline-flex justify-center items-center rounded-full border border-white/80 px-5 py-2.5 text-sm sm:text-base font-semibold text-white hover:bg-white hover:text-[#264653] transition-colors"
                    >
                        {currentUser ? "Switch account" : "Log in / Sign up"}
                    </button>
                </div>

                {currentUser && (
                    <p className="text-xs sm:text-sm text-gray-100">
                        Logged in as{" "}
                        <span className="font-semibold">
                            {currentUser.email}
                        </span>
                    </p>
                )}

                <p className="text-xs text-gray-200 mt-2">
                    To check your calendar, click the "Manage events" button
                    above.
                </p>
            </div>

            <LoginModal
                open={loginOpen}
                onClose={() => setLoginOpen(false)}
                onSuccess={handleLoginSuccess}
            />
        </main>
    );
}
