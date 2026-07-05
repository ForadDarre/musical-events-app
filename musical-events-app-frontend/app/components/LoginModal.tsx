"use client";

import { useState } from "react";
import axios from "axios";
import { User } from "../types/types";

interface LoginModalProps {
    open: boolean;
    onClose: () => void;
    onSuccess: (user: User) => void;
}

export default function LoginModal({
    open,
    onClose,
    onSuccess,
}: LoginModalProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    if (!open) return null;

    const resetState = () => {
        setPassword("");
        setError(null);
    };

    const handleClose = () => {
        resetState();
        onClose();
    };

    const handleAuth = async (mode: "login" | "signup") => {
        setLoading(true);
        setError(null);
        try {
            const url = `http://localhost:4000/api/users/${mode}`;
            const response = await axios.post<User>(
                url,
                { email, password },
                { withCredentials: true },
            );
            const user = response.data;
            onSuccess(user);
            handleClose();
        } catch (err: any) {
            const message =
                err?.response?.data?.error || "Something went wrong";
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl p-6 sm:p-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl sm:text-2xl font-semibold text-[#264653]">
                        Log in or sign up
                    </h2>
                    <button
                        type="button"
                        onClick={handleClose}
                        className="text-gray-500 hover:text-gray-700"
                        aria-label="Close login modal"
                    >
                        ×
                    </button>
                </div>

                <p className="text-sm text-gray-600 mb-4">
                    Use your email and password to access your personal musical
                    events calendar.
                </p>

                <form
                    className="space-y-4"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleAuth("login");
                    }}
                >
                    <div className="space-y-1">
                        <label
                            className="block text-sm font-medium text-[#264653]"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            required
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-[#6ec475] focus:outline-none focus:ring-2 focus:ring-[#6ec475]/40"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="space-y-1">
                        <label
                            className="block text-sm font-medium text-[#264653]"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            required
                            minLength={6}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-[#6ec475] focus:outline-none focus:ring-2 focus:ring-[#6ec475]/40"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <p className="text-xs text-gray-500">
                            Minimum 6 characters.
                        </p>
                    </div>

                    {error && (
                        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2">
                            {error}
                        </p>
                    )}

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex justify-center items-center rounded-full bg-[#6ec475] px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-emerald-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                        >
                            {loading ? "Logging in..." : "Log in"}
                        </button>
                        <button
                            type="button"
                            disabled={loading}
                            onClick={() => handleAuth("signup")}
                            className="inline-flex justify-center items-center rounded-full border border-[#264653] px-4 py-2 text-sm font-semibold text-[#264653] hover:bg-[#264653] hover:text-white disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                        >
                            {loading ? "Signing up..." : "Sign up"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
