"use client";

import { useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import CalendarPicker from "./components/CalendarPicker";
import AddEventModal from "./components/AddEventModal";
import axios from "axios";
import { MusicalEvent } from "../types/types";

export default function HomePage() {
    const [events, setEvents] = useState<MusicalEvent[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:4000/api/events/all"
                );
                console.log(res.data);
                setEvents(res.data);
            } catch (err) {
                console.error("Error fetching events:", err);
            }
        };

        fetchData();
    }, []);

    const handleClose = () => setOpen(false);

    const openModal = () => {
        setOpen(true);
    };

    const changeSelectedDate = (newValue: Date | null): void => {
        setSelectedDate(newValue);
    };

    const onSubmit = async (object: any): Promise<void> => {
        console.log(object);
        await axios.post("http://localhost:4000/api/events", object);
    };

    return (
        <div>
            <CalendarPicker
                events={events}
                selectedDate={selectedDate}
                changeSelectedDate={changeSelectedDate}
                setOpen={openModal}
            />
            <AddEventModal
                open={open}
                onClose={handleClose}
                onSubmit={onSubmit}
            />
        </div>
    );
}
