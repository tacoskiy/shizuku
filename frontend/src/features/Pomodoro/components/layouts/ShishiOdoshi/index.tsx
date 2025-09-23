"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Drops from "@/features/Pomodoro/components/elements/Drops";
import clsx from "clsx";
import animation from "./animation.module.css";
import { usePomodoroContext } from "@/contexts/PomodoroContext";

const ShishiOdoshi = () => {

    const pomodoro = usePomodoroContext();

    const [isAnimating, setAnimating] = useState<boolean>(false);

    useEffect(() => {
        if (pomodoro.state === "rest" || pomodoro.isPaused) return;
        setAnimating(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pomodoro.remaining]);

    return (
        <section className="relative w-fit h-120 overflow-visible">
            <Drops state={pomodoro.state} remaining={pomodoro.remaining} isPaused={pomodoro.isPaused}/>

            <div
                onAnimationEnd={() => setAnimating(false)}
                className={clsx(
                    "w-full absolute top-20 left-1/2 -translate-1/2 transition-all duration-500",
                    pomodoro.state === "focus" ? pomodoro.isPaused ? "rotate-50" : "rotate-30" : pomodoro.isPaused ? "rotate-10" : "-rotate-30",
                    isAnimating && animation.bounce
                )}
                style={{
                    transitionTimingFunction: "cubic-bezier(.43,1.55,.5,1)"
                }}
            >
                <Image src={"img/shishiodoshi/body.svg"} className="w-full h-full -translate-x-6" width={100} height={100} alt={""} />
            </div>

            <div className="relative w-100 h-fit flex flex-col items-center">
                <div className="w-full h-110 overflow-clip">
                    <Image src={"img/shishiodoshi/base.svg"} className="w-full h-120 relative" width={100} height={100} alt={""} />
                </div>
                <div className="relative bg-gradient-to-b from-primary to-transparent w-1/2 h-36 rounded-t-xl"></div>
            </div>

            <div className={clsx(
                "bg-gradient-to-b from-foreground to-transparent w-8 h-135 absolute bottom-0 translate-y-1/2 -translate-x-4 rounded-tl-full transition-all duration-300 delay-300",
                pomodoro.state === "rest" && !pomodoro.isPaused ? "opacity-24" : "opacity-0"
            )}></div>
            
        </section>
    );
}

export default ShishiOdoshi;