"use client";

import { useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import CalendarPicker from "./components/CalendarPicker";
import AddEventModal from "./components/AddEventModal";
import axios from "axios";
import { MusicalEvent } from "../types/types";
import { MusicalEventDto } from "../types/DTOs";
import {
    musicalEventDtoToMusicalEvent,
    musicalEventToMusicalEventDto,
} from "../mappers/MusicalEventMappers";

export default function HomePage() {
    const [events, setEvents] = useState<MusicalEvent[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [open, setOpen] = useState<boolean>(false);
    const [selectedEvent, setSelectedEvent] = useState<MusicalEvent | null>(
        null
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:4000/api/events/all"
                );
                const eventDtos: MusicalEventDto[] = res.data;

                const newEvents: MusicalEvent[] = eventDtos.map((e) =>
                    musicalEventDtoToMusicalEvent(e)
                );

                setEvents(newEvents);
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

        if (newValue) {
            const newSelectedEvent: MusicalEvent = {
                title: "",
                date: newValue,
                timeOfDay: "00:00:00",
                todos: [],
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
        const eventToAddDto: MusicalEventDto =
            musicalEventToMusicalEventDto(eventToAdd);
        await axios.post("http://localhost:4000/api/events", eventToAddDto);
    };

    return (
        <div>
            <CalendarPicker
                events={events}
                selectedDate={selectedDate}
                changeSelectedDate={changeSelectedDate}
                changeSelectedEvent={changeSelectedEvent}
                setOpen={openModal}
            />
            <AddEventModal
                open={open}
                onClose={handleClose}
                onSubmit={onSubmit}
                initial={selectedEvent}
            />
        </div>
    );
}
