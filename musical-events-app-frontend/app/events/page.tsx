"use client";

import { useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import CalendarPicker from "./components/CalendarPicker";
import AddEventModal from "./components/AddEventModal";

export default function HomePage() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [open, setOpen] = useState<boolean>(false);

    const handleClose = () => setOpen(false);

    const openModal = () => {
        setOpen(true);
    };

    const changeSelectedDate = (newValue: Date | null): void => {
        setSelectedDate(newValue);
    };

    return (
        <div>
            <CalendarPicker
                selectedDate={selectedDate}
                changeSelectedDate={changeSelectedDate}
                setOpen={openModal}
            />
            <AddEventModal open={open} onClose={handleClose} />
        </div>
    );
}
