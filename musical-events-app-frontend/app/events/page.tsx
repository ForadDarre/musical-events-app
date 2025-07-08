"use client";

import { useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import CalendarPicker from "./components/CalendarPicker";
import { Dayjs } from "dayjs";

export default function HomePage() {
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

    const changeSelectedDate = (newValue: Dayjs | null): void => {
        setSelectedDate(newValue);
    };

    return (
        <div>
            <CalendarPicker
                selectedDate={selectedDate}
                changeSelectedDate={changeSelectedDate}
            />
        </div>
    );
}
