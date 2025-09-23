import clsx from "clsx";
import Image from "next/image";

import StateIndicator from "../elements/StateIndicator";
import { usePomodoroContext } from "@/contexts/PomodoroContext";

const ControlPanel = () => {

    const pomodoro = usePomodoroContext();

    const iconClass = clsx("w-12 h-12 absolute top-1/2 left-1/2 -translate-1/2 transition-all duration-300");

    return (
        <section className="flex gap-16">
            
            <button onClick={pomodoro.toggle} className="w-24 h-24 flex items-center justify-center relative">
                <Image src={"img/icon/play.svg"} className={clsx(iconClass, pomodoro.isPaused ? "opacity-100" : "opacity-0")} width={24} height={24} alt={"play"}/>
                <Image src={"img/icon/pause.svg"} className={clsx(iconClass, !pomodoro.isPaused ? "opacity-100" : "opacity-0")} width={24} height={24} alt={"pause"}/>
                <div className={clsx(
                    "w-full h-full bg-foreground transition-all duration-300 active:scale-95 opacity-50 absolute top-1/2 left-1/2 -translate-1/2",
                    pomodoro.isPaused ? "rotate-0" : "rotate-45"
                )}></div>
            </button>

            <div className="w-120 flex flex-col">
                <StateIndicator state={pomodoro.state} isPaused={pomodoro.isPaused}/>
                <p>{pomodoro.remaining}</p>
            </div>

        </section>
    );
}

export default ControlPanel;