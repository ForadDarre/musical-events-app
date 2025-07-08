import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { Dayjs } from "dayjs";
import { EventContentArg } from "@fullcalendar/core/index.js";

interface DataProps {
    selectedDate: Dayjs | null;
    changeSelectedDate: Function;
}

const events = [{ title: "Meeting", start: new Date() }];

function CalendarPicker(props: DataProps) {
    const { selectedDate, changeSelectedDate } = props;

    const handleDateClick = (arg: DateClickArg) => {
        console.log("Date clicked:", arg.dateStr);
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
