import { EventClickArg } from "@fullcalendar/core/index.js";
import { MusicalEventDto } from "../types/DTOs";
import { MusicalEvent } from "../types/types";

export const musicalEventDtoToMusicalEvent = (
    dto: MusicalEventDto
): MusicalEvent => {
    const date = new Date(dto.date);

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    const timeOfDay = `${hours}:${minutes}:${seconds}`;

    const musicalEvent: MusicalEvent = {
        ...dto,
        timeOfDay,
    };

    return musicalEvent;
};

export const musicalEventToMusicalEventDto = (
    event: MusicalEvent
): MusicalEventDto => {
    const date = new Date(event.date);

    // Parse the timeOfDay string ("HH:mm:ss")
    const [hours, minutes, seconds] = event.timeOfDay.split(":").map(Number);

    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds || 0);

    const dto: MusicalEventDto = {
        id: event.id,
        title: event.title,
        date,
        todos: event.todos,
    };

    return dto;
};

export const calendarEventToMusicalEvent = (
    arg: EventClickArg
): MusicalEvent => {
    const eventToUpdate: MusicalEvent = {
        id: arg.event.id,
        timeOfDay: arg.event.extendedProps.timeOfDay,
        todos: arg.event.extendedProps.todos,
        title: arg.event.title,
        date: arg.event.start ?? new Date(),
    };

    return eventToUpdate;
};
