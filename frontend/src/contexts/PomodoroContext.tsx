"use client";

import usePomodoro from "@/features/Pomodoro/hooks/usePomodoro";
import { createContext, useContext, ReactNode } from "react";

const PomodoroContext = createContext<ReturnType<typeof usePomodoro> | null>(null);

export const PomodoroProvider = ({children}: {children: ReactNode}) => {
    const pomodoro = usePomodoro();
    return (
        <PomodoroContext.Provider value={pomodoro}>
            {children}
        </PomodoroContext.Provider>
    );
}

export const usePomodoroContext = () => {
    const context = useContext(PomodoroContext);
    if(!context) throw new Error("usePomodoroContext must be used in PomodoroProvider");
    return context;
}