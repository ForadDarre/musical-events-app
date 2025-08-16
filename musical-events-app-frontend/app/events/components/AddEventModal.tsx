import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    Stack,
    IconButton,
    Divider,
    FormHelperText,
    useMediaQuery,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import { Close, Delete, Add } from "@mui/icons-material";
import {
    LocalizationProvider,
    DatePicker,
    TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useTheme } from "@mui/material/styles";
import { MusicalEvent } from "../../types/types";

interface AddEventModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: MusicalEvent) => void;
    initial: MusicalEvent | null;
}

const AddEventModal: React.FC<AddEventModalProps> = ({
    open,
    onClose,
    onSubmit,
    initial,
}) => {
    const theme = useTheme();
    const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));

    const [title, setTitle] = useState<string>(initial?.title || "");
    const [date, setDate] = useState<Dayjs | null>(
        initial?.date ? dayjs(initial.date) : dayjs()
    );
    const [timeOfDay, setTimeOfDay] = useState<Dayjs | null>(
        initial?.timeOfDay ? dayjs(`1970-01-01T${initial.timeOfDay}`) : dayjs()
    );
    const [todos, setTodos] = useState<string[]>(initial?.todos || []);
    const [errors, setErrors] = useState<{
        title?: string;
        date?: string;
        timeOfDay?: string;
        todos?: string;
    }>({});

    useEffect(() => {
        setTitle(initial?.title || "");
        setDate(initial?.date ? dayjs(initial.date) : dayjs());
        setTimeOfDay(
            initial?.timeOfDay
                ? dayjs(`1970-01-01T${initial.timeOfDay}`)
                : dayjs()
        );
        setTodos(initial?.todos || []);
    }, [initial]);

    const validate = (): boolean => {
        const newErrors: typeof errors = {};
        if (!title.trim()) newErrors.title = "Title is required";
        if (!date) newErrors.date = "Date is required";
        if (!timeOfDay) newErrors.timeOfDay = "Time is required";
        if (todos.some((t) => t.trim() === "")) {
            newErrors.todos = "All todo items must be non-empty or remove them";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleTodoChange = (index: number, value: string) => {
        setTodos((prev) => {
            const copy = [...prev];
            copy[index] = value;
            return copy;
        });
    };

    const addTodo = () => setTodos((prev) => [...prev, ""]);

    const removeTodo = (index: number) => {
        setTodos((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = () => {
        if (!validate()) return;
        if (!date || !timeOfDay) return;
        onSubmit({
            title: title.trim(),
            date: date.toDate(),
            timeOfDay: timeOfDay.format("HH:mm"),
            todos: todos.map((t) => t.trim()),
        });
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
            fullScreen={isSmDown}
            aria-labelledby="add-event-dialog-title"
        >
            <DialogTitle
                sx={{
                    p: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography variant="h6" component="div">
                    <>{console.log(initial?.date)}</>
                    Create Musical Event
                </Typography>
                <IconButton onClick={onClose} aria-label="close" size="small">
                    <Close />
                </IconButton>
            </DialogTitle>

            <Divider />

            <DialogContent dividers sx={{ px: 2, pt: 2, pb: 1 }}>
                <Stack spacing={2}>
                    <TextField
                        label="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        fullWidth
                        required
                        error={!!errors.title}
                        helperText={errors.title}
                    />

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Stack
                            direction={isSmDown ? "column" : "row"}
                            spacing={2}
                            alignItems="flex-start"
                        >
                            <Box flex={1}>
                                <DatePicker
                                    label="Date"
                                    value={date}
                                    onChange={(newVal) => setDate(newVal)}
                                    slotProps={{
                                        textField: { fullWidth: true },
                                    }}
                                    disablePast={false}
                                    format="YYYY-MM-DD"
                                />
                                {errors.date && (
                                    <FormHelperText error>
                                        {errors.date}
                                    </FormHelperText>
                                )}
                            </Box>
                            <Box flex={1}>
                                <TimePicker
                                    label="Time of Day"
                                    value={timeOfDay}
                                    onChange={(newVal) => setTimeOfDay(newVal)}
                                    slotProps={{
                                        textField: { fullWidth: true },
                                    }}
                                    ampm={false}
                                />
                                {errors.timeOfDay && (
                                    <FormHelperText error>
                                        {errors.timeOfDay}
                                    </FormHelperText>
                                )}
                            </Box>
                        </Stack>
                    </LocalizationProvider>

                    <Box>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            mb={1}
                        >
                            <Typography variant="subtitle1">Todos</Typography>
                            <Button
                                size="small"
                                startIcon={<Add />}
                                onClick={addTodo}
                                aria-label="add todo"
                            >
                                Add
                            </Button>
                        </Stack>
                        {todos.map((todo, idx) => (
                            <Stack
                                key={idx}
                                direction="row"
                                spacing={1}
                                alignItems="center"
                                mb={1}
                            >
                                <TextField
                                    label={`Todo ${idx + 1}`}
                                    value={todo}
                                    onChange={(e) =>
                                        handleTodoChange(idx, e.target.value)
                                    }
                                    fullWidth
                                    size="small"
                                />
                                <IconButton
                                    size="small"
                                    aria-label={`remove todo ${idx + 1}`}
                                    onClick={() => removeTodo(idx)}
                                    disabled={todos.length === 1}
                                >
                                    <Delete fontSize="small" />
                                </IconButton>
                            </Stack>
                        ))}
                        {errors.todos && (
                            <FormHelperText error>
                                {errors.todos}
                            </FormHelperText>
                        )}
                    </Box>
                </Stack>
            </DialogContent>

            <DialogActions sx={{ px: 2, pb: 2 }}>
                <Button onClick={onClose} variant="outlined">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} variant="contained">
                    Save Event
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddEventModal;
