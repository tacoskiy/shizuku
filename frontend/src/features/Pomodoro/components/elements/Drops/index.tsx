"use client";

import clsx from "clsx";
import animation from "./animation.module.css"
import { PomodoroState } from "@/types/PomodoroTypes";
import { useEffect, useState, useRef } from "react";

interface DropsProps{
    state: PomodoroState;
    remaining: number;
    isPaused: boolean;
}

const Drops = ({ state, remaining, isPaused }:DropsProps) => {

    const [drops, setDrops] = useState<number[]>([]);
    const idCount = useRef(0);

    useEffect(() => {
        if (state === "rest" || isPaused) return;
        idCount.current += 1;
        setDrops(prev => [...prev, idCount.current]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [remaining]);

    function hundleDeleteDrop (id: number){
        setDrops(prev => [...prev.filter(item => item != id)]);
    }

    return (
        <div className="w-fit h-fit absolute top-0 left-0">
            {drops.map((id) => (
                <div
                    key={id}
                    onAnimationEnd={() => hundleDeleteDrop(id)}
                    className={clsx(
                        "w-2 h-2 bg-foreground rounded-full", animation.fall
                    )}
                ></div>
            ))}
        </div>
    );
}

export default Drops;