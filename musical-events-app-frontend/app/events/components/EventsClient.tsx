"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import axios from "axios";

const CalendarPicker = dynamic(() => import("./CalendarPicker"), {
    ssr: false,
});
import AddEventModal from "./AddEventModal";

import type { MusicalEvent, User } from "../../types/types";
import type { MusicalEventDto } from "../../types/DTOs";
import {
    musicalEventDtoToMusicalEvent,
    musicalEventToMusicalEventDto,
} from "../../mappers/MusicalEventMappers";

interface EventsClientProps {
    initialUser: User;
    initialEvents: MusicalEvent[];
}

export default function EventsClient({
    initialUser,
    initialEvents,
}: EventsClientProps) {
    const router = useRouter();

    const [user] = useState<User | null>(initialUser);
    const [events, setEvents] = useState<MusicalEvent[]>(initialEvents);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [open, setOpen] = useState<boolean>(false);
    const [selectedEvent, setSelectedEvent] = useState<MusicalEvent | null>(
        null,
    );

    const loadEvents = useCallback(async () => {
        try {
            const res = await axios.get<MusicalEventDto[]>(
                "http://localhost:4000/api/events/me",
                { withCredentials: true },
            );
            const newEvents = res.data.map(musicalEventDtoToMusicalEvent);
            setEvents(newEvents);
        } catch (err) {
            console.error("Error fetching events:", err);
            if (axios.isAxiosError(err) && err.response?.status === 401) {
                router.push("/");
            }
        }
    }, [router]);

    const handleClose = () => setOpen(false);

    const openModal = () => {
        setOpen(true);
    };

    const changeSelectedDate = (newValue: Date | null): void => {
        setSelectedDate(newValue);

        if (newValue && user) {
            const newSelectedEvent: MusicalEvent = {
                title: "",
                date: newValue,
                timeOfDay: "00:00:00",
                todos: [],
                userId: user.id,
            };

            setSelectedEvent(newSelectedEvent);
        } else {
            setSelectedEvent(null);
        }
    };

    const changeSelectedEvent = (newValue: MusicalEvent): void => {
        setSelectedEvent(newValue);
        setOpen(true);
    };

    const onSubmit = async (eventToAdd: MusicalEvent): Promise<void> => {
        if (!user) return;
        const eventDto: MusicalEventDto =
            musicalEventToMusicalEventDto(eventToAdd);

        if (eventToAdd.id) {
            await axios.put(
                `http://localhost:4000/api/events/${eventToAdd.id}`,
                eventDto,
                { withCredentials: true },
            );
        } else {
            await axios.post("http://localhost:4000/api/events", eventDto, {
                withCredentials: true,
            });
        }

        await loadEvents();
    };

    if (!user) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-white px-4">
                <div className="max-w-md rounded-3xl bg-white shadow-xl border border-gray-100 px-6 py-8 text-center">
                    <h1 className="text-xl font-semibold text-[#264653] mb-3">
                        Sign in to see your calendar
                    </h1>
                    <p className="text-sm text-gray-600 mb-4">
                        You will be redirected to the home page to log in.
                    </p>
                    <button
                        type="button"
                        onClick={() => router.push("/")}
                        className="inline-flex justify-center items-center rounded-full bg-[#6ec475] px-5 py-2 text-sm font-semibold text-[#264653] shadow-md hover:bg-emerald-400 transition-colors"
                    >
                        Go to home
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-white px-4 py-6 sm:py-10">
            <div className="max-w-5xl mx-auto flex flex-col gap-6">
                <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-[#264653]">
                            Your musical calendar
                        </h1>
                        <p className="text-sm text-gray-600 mt-1">
                            Click on a date to add a new event, or click an
                            existing event to edit it.
                        </p>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500">
                        Logged in as{" "}
                        <span className="font-semibold">{user.email}</span>
                    </p>
                </header>

                <section className="rounded-3xl bg-white shadow-xl border border-gray-100 p-3 sm:p-5">
                    <CalendarPicker
                        events={events}
                        selectedDate={selectedDate}
                        changeSelectedDate={changeSelectedDate}
                        changeSelectedEvent={changeSelectedEvent}
                        setOpen={openModal}
                    />
                </section>

                <AddEventModal
                    open={open}
                    onClose={handleClose}
                    onSubmit={onSubmit}
                    initial={selectedEvent}
                />
            </div>
        </main>
    );
}
