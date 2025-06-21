"use client";

import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { Value } from "react-calendar/dist/shared/types.js";

type Event = {
    id: string;
    title: string;
    date: string;
    timeOfDay: string;
    todos: string[];
};

export default function HomePage() {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [events, setEvents] = useState<Event[]>([]);
    const [title, setTitle] = useState("");
    const [timeOfDay, setTimeOfDay] = useState("");
    const [todos, setTodos] = useState("");

    const dateStr = selectedDate.toISOString().split("T")[0];

    const fetchEvents = async () => {
        try {
            const res = await axios.get(
                `http://localhost:4000/api/events/${dateStr}`
            );
            setEvents(res.data);
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, [selectedDate]);

    const handleSubmit = async () => {
        try {
            await axios.post("http://localhost:4000/api/events", {
                title,
                date: selectedDate.toISOString(),
                timeOfDay,
                todos: todos.split(",").map((t) => t.trim()),
            });
            setTitle("");
            setTimeOfDay("");
            setTodos("");
            fetchEvents();
        } catch (error) {
            console.error("Error adding event:", error);
        }
    };

    const onSelectChange = (date: Value) => {
        if (date instanceof Date) {
            setSelectedDate(date);
        }
    };

    return (
        <main style={{ maxWidth: 600, margin: "0 auto" }}>
            <h1>🎶 Musical Events</h1>
            <Calendar onChange={onSelectChange} value={selectedDate} />

            <section style={{ marginTop: "2rem" }}>
                <h2>Add Event</h2>
                <input
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{
                        display: "block",
                        margin: "0.5rem 0",
                        width: "100%",
                    }}
                />
                <input
                    placeholder="Time of Day"
                    value={timeOfDay}
                    onChange={(e) => setTimeOfDay(e.target.value)}
                    style={{
                        display: "block",
                        margin: "0.5rem 0",
                        width: "100%",
                    }}
                />
                <input
                    placeholder="To-dos (comma separated)"
                    value={todos}
                    onChange={(e) => setTodos(e.target.value)}
                    style={{
                        display: "block",
                        margin: "0.5rem 0",
                        width: "100%",
                    }}
                />
                <button onClick={handleSubmit} style={{ marginTop: "1rem" }}>
                    Add Event
                </button>
            </section>

            <section style={{ marginTop: "2rem" }}>
                <h2>Events on {selectedDate.toDateString()}</h2>
                {events.length === 0 ? (
                    <p>No events.</p>
                ) : (
                    <ul>
                        {events.map((event) => (
                            <li key={event.id} style={{ marginBottom: "1rem" }}>
                                <strong>{event.title}</strong> @{" "}
                                {event.timeOfDay}
                                <ul>
                                    {event.todos.map((todo, idx) => (
                                        <li key={idx}>- {todo}</li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </main>
    );
}
