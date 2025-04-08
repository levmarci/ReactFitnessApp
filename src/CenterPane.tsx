import "./CenterPane.less";
import { ExerciseDto, WorkoutDto, workoutService } from "./ClientService";
import { WorkoutHeader } from "./WorkoutHeader";
import { ExerciseList } from "./ExerciseList";
import { useState, useEffect } from "preact/hooks";
import { IconButton } from "./IconButton";

// A CenterPane komponens felelős az aktuálisan kiválasztott workout és annak exercise-ai kezeléséért.
export function CenterPane({
    workout,
    onBack,
}: {
    workout?: WorkoutDto; // Az aktuálisan kiválasztott workout
    onBack: () => void;
}) {
    // Excerise-ok állapota
    const [exercises, setExercises] = useState<ExerciseDto[]>(workout?.exercises || []);
    // Workout neve
    const [workoutName, setWorkoutName] = useState(workout?.name || "");

    // Frissítjük az állapotokat ha változnak
    useEffect(() => {
        if (workout) {
            setExercises(workout.exercises);
            setWorkoutName(workout.name);
        }
    }, [workout]);

    // Exercise módosítása
    const handleExerciseChange = (updatedExercise: ExerciseDto, index: number) => {
        setExercises((prev) => {
            const updated = [...prev]; // Másolat a meglévő állapotról
            updated[index] = updatedExercise; // Frissítjük az adott indexű exercise-t
            return updated;
        });
    };

    // Új, üres exercise hozzáadása
    const addEmptyExercise = () => {
        setExercises((prev) => [
            ...prev,
            {
                id: prev.length + 1,
                type: "",
                weight: 0,
                repetitions: 0,
                restTime: 0,
                notes: "",
            },
        ]);
    };

    // Az aktuális workout mentése
    const saveWorkout = () => {
        if (workout) {
            const updatedWorkout = {
                ...workout,
                name: workoutName, // Frissített név
                exercises, // Frissített exercise-ok
            };
            workoutService.saveWorkout(updatedWorkout); // Mentés
        }
    };

    // A workout mentése, amikor a név vagy az exercise-ok változnak
    useEffect(() => {
        saveWorkout();
    }, [workoutName, exercises]);

    return (
        <div className="CenterPane">
            {/* Vissza gomb */}
            <div className="backButton">
                <IconButton onClick={onBack} text="Back" icon="arrow_back" />
            </div>
            {/* Workout adatai */}
            {workout && (
                <>
                    {/* Workout fejléce */}
                    <WorkoutHeader name={workoutName} onNameChange={setWorkoutName} />
                    {/* Exercise-ok listája */}
                    <ExerciseList
                        exercises={exercises}
                        onExerciseChange={handleExerciseChange}
                    />
                    {/* Új exercise hozzáadása */}
                    <IconButton icon="add" text="Add Exercise" onClick={addEmptyExercise} />
                </>
            )}
        </div>
    );
}
