import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { EventContentArg } from "@fullcalendar/core/index.js";
import { MusicalEvent } from "../../types/types";

interface DataProps {
    events: MusicalEvent[];
    selectedDate: Date | null;
    changeSelectedDate: Function;
    setOpen: Function;
}

function CalendarPicker(props: DataProps) {
    const { events, selectedDate, changeSelectedDate, setOpen } = props;

    const handleDateClick = (arg: DateClickArg) => {
        changeSelectedDate(arg.date);
        setOpen(true);
    };

    const renderEventContent = (eventInfo: EventContentArg) => {
        return (
            <>
                <b>{eventInfo.timeText}</b>
                <i>{eventInfo.event.title}</i>
            </>
        );
    };

    return (
        <div>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                weekends={true}
                events={events}
                eventContent={renderEventContent}
                dateClick={handleDateClick}
            />
        </div>
    );
}

export default CalendarPicker;
