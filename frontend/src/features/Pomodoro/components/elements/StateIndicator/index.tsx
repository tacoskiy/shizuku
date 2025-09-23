"use client";

import clsx from "clsx"
import { PomodoroState } from "@/types/PomodoroTypes";
import { useEffect, useState } from "react";
import animation from "./animation.module.css"

interface StateIndicatorProps{
    state: PomodoroState;
    isPaused: boolean;
}

const StateIndicator = ({state, isPaused}:StateIndicatorProps) => {
    
    const [messages, setMessages] = useState<{id: number, message: string}[]>([]);

    useEffect(() => {

        const msg = (() => {
            switch(state){
                case "init": return "Start";
                case "focus": return isPaused ? "Paused" : "Focus";
                case "rest": return isPaused ? "Paused" : "Rest";
                case "done": return "Done";
                default: return "Start";
            }
        })();

        setMessages(prev => {
            const last = prev[prev.length - 1];
            if (last?.message === msg) return prev;
            return [...(last ? [last] : []), {id: (last?.id ?? 0) + 1, message: msg}];
        });
        
    }, [state, isPaused]);

    const spanClass = clsx(state === "init" ? "opacity-100" : "opacity-50", "transition-all duration-300");

    return (
        <div>

            <div className="w-full h-16 overflow-clip relative">
                {messages.map((item) => (
                    <p key={item.id} className={clsx(
                        item.id === messages[messages.length - 1].id
                            ? !(state === "init") && animation.fadeIn
                            : animation.fadeOut,
                        "h-16 absolute top-0 left-0 font-asset text-6xl text-foreground"
                    )}>{item.message}</p>
                ))}
            </div>

            <p className="font-mont font-semibold text-xl text-foreground inline-flex gap-2">
                <span className={clsx(state === "focus" ? "opacity-100" : spanClass)}>25min</span>/<span className={clsx(state === "rest" ? "opacity-100" : spanClass)}>5min</span>
                <span className={clsx(state === "init" ? "opacity-100" : "opacity-0", "transition-all duration-300")}>Pomodoro Timer</span>
            </p>
            
        </div>
    );
}

export default StateIndicator;