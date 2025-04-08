import { useState, useEffect } from "preact/hooks";
import "./Stopwatch.less";

export function Stopwatch() {
    const [time, setTime] = useState(0); // Idő másodpercben
    const [isRunning, setIsRunning] = useState(false); // Állapot, hogy fut-e a stopper

    // Timer frissítése minden 100 ms-ban, ha fut
    useEffect(() => {
        let timer: number | null = null;

        if (isRunning) {
            timer = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 100);
        } else if (!isRunning && timer) {
            clearInterval(timer);
        }

        return () => {
            if (timer) clearInterval(timer);
        };
    }, [isRunning]);

    // Stopper leállítása vagy újraindítása
    const toggleRunning = () => {
        setIsRunning((prevState) => !prevState);
    };

    // Stopper nullázása
    const reset = () => {
        setTime(0);
        setIsRunning(false);
    };

    // Idő formázása (perc: másodperc: tizedmásodperc)
    const formatTime = (time: number) => {
        const seconds = Math.floor(time / 10) % 60;
        const minutes = Math.floor(time / 600);
        const tenths = time % 10;
        return `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}.${tenths}`;
    };

    return (
        <div className="Stopwatch">
            <h1>Stopwatch</h1>
            <div className="time-display">{formatTime(time)}</div>
            <div className="buttons">
                <button onClick={toggleRunning}>
                    {isRunning ? "Pause" : "Start"}
                </button>
                <button onClick={reset}>Reset</button>
            </div>
        </div>
    );
}
