import "./ExerciseCard.less";
import { ExerciseDto } from "./ClientService";
import { useState, useEffect } from "preact/hooks";
import { TextInput } from "./TextInput";

export function ExerciseCard({ exercise, onChange }: {
    exercise: ExerciseDto;
    onChange: (updatedExercise: ExerciseDto) => void; // értesít a módosításokról
}) {

    let [type, setType] = useState(exercise.type); //  típusa
    let [weight, setWeight] = useState(exercise.weight); // Használt súly
    let [repetitions, setRepetitions] = useState(exercise.repetitions); // Ismétlések száma
    let [restTime, setRestTime] = useState(exercise.restTime); // Pihenőidő
    let [notes, setNotes] = useState(exercise.notes || ""); // Megjegyzések

    // Frissítések, amikor az exercise megváltozik
    useEffect(() => {
        setType(exercise.type);
        setWeight(exercise.weight);
        setRepetitions(exercise.repetitions);
        setRestTime(exercise.restTime);
        setNotes(exercise.notes || "");
    }, [exercise]);

    useEffect(() => {
        const updatedExercise = { ...exercise, type, weight, repetitions, restTime, notes };
        onChange(updatedExercise); // A frissített gyakorlat adatok visszaadása a szülőnek
    }, [type, weight, repetitions, restTime, notes]);

    return (
        <div className="ExerciseCard">
            <div className="bubble">
                {/* Gyakorlat típus mező */}
                <TextInput
                    label="Type:" // Címke a mezőhöz
                    value={type} // Jelenlegi érték
                    onChange={(value) => setType(value.toString())} // Változtatás kezelése
                    placeholder="Type"
                />
                {/* Súly mező */}
                <TextInput
                    label="Weight:"
                    value={weight}
                    onChange={(value) => setWeight(Number(value))} // Számértékre konvertálás
                    placeholder="Weight"
                    type="number" // Csak számok megadása engedélyezett
                    unit="kg" // Mértékegység kijelzése
                />
                {/* Ismétlések mező */}
                <TextInput
                    label="Repetitions:"
                    value={repetitions}
                    onChange={(value) => setRepetitions(Number(value))}
                    placeholder="Repetitions"
                    type="number"
                />
                {/* Pihenőidő mező */}
                <TextInput
                    label="Rest Time:"
                    value={restTime}
                    onChange={(value) => setRestTime(Number(value))}
                    placeholder="Rest Time"
                    type="number"
                    unit="minutes" // Mértékegység kijelzése
                />
                {/* Megjegyzések mező */}
                <TextInput
                    label="Notes:"
                    value={notes}
                    onChange={(value) => setNotes(value.toString())}
                    placeholder="Notes"
                />
            </div>
        </div>
    );
}
