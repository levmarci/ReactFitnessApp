import "./LeftPane.less";
import { WorkoutCard } from "./WorkoutCard";
import { WorkoutDto, workoutService } from "./ClientService";
import { useState, useEffect } from "preact/hooks";
import { IconButton } from "./IconButton";

export function LeftPane({ selected, onSelect, onRight }: { 
    selected?: WorkoutDto; // Jelenleg kiválasztott workout
    onSelect: (workout: WorkoutDto) => void; // Kiválasztott workout beállításához használt
    onRight: () => void; // jobb oldali panel megnyitása
}) {
    // Állapot a workout-ok listájának tárolására
    const [workouts, setWorkouts] = useState(workoutService.storage.workouts);

    // Feliratkozás a workoutService változásaira
    useEffect(() => {
        const updateWorkouts = () => setWorkouts([...workoutService.storage.workouts]); // Workout lista frissítése

        workoutService.addListener(updateWorkouts); // Feliratkozás
        return () => workoutService.removeListener(updateWorkouts); // Leiratkozás
    }, []);

    // Új workout hozzáadásáért felelős függvény
    const handleAddWorkout = () => {
        workoutService.addWorkout(); // Új workout hozzáadása
    };

    return (
        <div className="LeftPane">
            {/* Panel fejléc */}
            <header className="header">
                Fitness App
            </header>
            
            {/* stoppert megnyitó gomb */}
            <div className="backButton">
                <IconButton icon="timer" text="Stopwatch" onClick={onRight} />
            </div>
            
            {/* Workout hozzáadó gomb */}
            <IconButton
                onClick={handleAddWorkout}
                icon="add"
                text="Add Workout"
            >
            </IconButton>
            
            {/* Workout lista */}
            <div className="workouts">
                {workouts.map(x =>
                    <WorkoutCard
                        key={x.id} // Egyedi kulcs az azonosítás érdekében
                        workout={x} // Az aktuális workout adatai
                        selected={x.id === selected?.id} // Azonosító alapján ellenőrzés, hogy ez a workout van-e kiválasztva
                        onSelect={() => onSelect(x)} // A workout kiválasztásakor meghívandó
                        onDelete={() => {
                            // Ha a törölt workout az aktuálisan kiválasztott, állítsuk undefined-ra
                            if (x.id === selected?.id) {
                                onSelect(undefined);
                            }
                            workoutService.deleteWorkout(x.id); // Workout törlése
                        }}
                    />
                )}
            </div>
        </div>
    );
}
