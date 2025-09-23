"use client";

import NoiseLayer from "@/components/layouts/NoiseLayer";
import BackGround from "@/features/Pomodoro/components/layouts/BackGround";
import ControlPanel from "@/features/Pomodoro/components/layouts/ControlPanel";
import ShishiOdoshi from "@/features/Pomodoro/components/layouts/ShishiOdoshi";
import { PomodoroProvider } from "@/contexts/PomodoroContext";

const PomodoroPage = () => {
    return (
        <main className="flex px-48 py-48 overflow-hidden w-full h-screen items-center justify-between max-lg:flex-col-reverse">
            <PomodoroProvider>
                <NoiseLayer/>
                <ControlPanel/>
                <ShishiOdoshi/>
                <BackGround/>
            </PomodoroProvider>
        </main>
    );
}

export default PomodoroPage;