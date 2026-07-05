export interface MusicalEvent {
    id?: string;
    title: string;
    date: Date;
    timeOfDay: string;
    todos: string[];
    userId?: string;
}

export interface User {
    id: string;
    email: string;
}
