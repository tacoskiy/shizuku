"use client";

import { useEffect, useState } from "react";

import * as types from "@/types/types";

interface PomodoroDurations{
    focus: number;
    rest: number;
}

const usePomodoro = (duration:PomodoroDurations = {focus: 25 * 60, rest: 5 * 60}) => {
    const [state, setState] = useState<types.PomodoroState>("focus");
    const [remaining, setRemaining] = useState<number>(25 * 60);
    const [isRunning, setIsRunning] = useState<boolean>(false);

    useEffect(() => {
        if (!isRunning) return;
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
        }, 1);
        return () => clearInterval(interval);
    }, [state, isRunning, remaining, duration]);

    function start (){
        setIsRunning(true);
        console.log("timer start");
    }

    function pause (){
        setIsRunning(false);
        console.log("timer pause");
    }

    function reset (){
        setIsRunning(false);
        setRemaining(duration.focus);
        setState("focus");
        console.log("timer reset");
    }

    function toggle (){
        setIsRunning(!isRunning);
    }

    return {state, isRunning, start, pause, reset, toggle}
}

export default usePomodoro;