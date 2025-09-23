"use client";

import { useEffect, useState } from "react";

import { PomodoroState } from "@/types/PomodoroTypes";

const usePomodoro = () => {
    const [state, setState] = useState<PomodoroState>("init");
    const [isPaused, setIsPaused] = useState<boolean>(true);
    const [remaining, setRemaining] = useState<number>(25 * 60);
    const [duration, setDuration] = useState<{focus: number, rest: number}>({focus: 25 * 60, rest: 5 * 60});

    useEffect(() => {
        if (isPaused || ["init", "done"].includes(state)) return;
        const interval = setInterval(() => {
            setRemaining(prev => {
                if (prev <= 1 && state === "focus"){
                    setState("rest");
                    return duration.rest;
                } else if (prev <= 1 && state === "rest"){
                    setState("focus");
                    return duration.focus;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [state, isPaused, remaining, duration]);

    function start (focus: number, rest: number){
        setState("focus");
        setIsPaused(false);
        setDuration({focus, rest});
    }

    function pause (){
        setIsPaused(true);
    }

    function reset (){
        setIsPaused(false);
        setRemaining(duration.focus);
        setState("focus");
        console.log("timer reset");
    }

    function toggle (){
        if (state === "init"){
            start(duration.focus, duration.rest);
        } else {
            setIsPaused(!isPaused);
        }
    }

    return {state, isPaused, remaining, duration, start, pause, reset, toggle}
}

export default usePomodoro;