"use client";

import Image from "next/image";
import clsx from "clsx";
import { usePomodoroContext } from "@/contexts/PomodoroContext";

const BackGround = () => {
    const pomodoro = usePomodoroContext();

    return (
        <section className="w-full h-screen fixed top-0 left-0 -z-1 overflow-clip">
            <Image src={"img/pattern/seigaiha.svg"} className="opacity-8 w-full h-full object-cover absolute top-0 left-0 z-1" fill alt={""}/>
            <div className={clsx(
                "bg-gradient-to-t from-primary to-primary-rest w-full h-screen absolute top-0 left-0 z-0 transition-all duration-300",
                pomodoro.isPaused || pomodoro.state === "rest" ? "opacity-100" : "opacity-0"
            )}></div>
            <div className="bg-gradient-to-t from-primary-focus to-primary w-full h-screen absolute top-0 left-0 -z-1 transition-all duration-300"></div>
        </section>
    );
}

export default BackGround;