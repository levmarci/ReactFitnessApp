import { ExerciseCard } from "./ExerciseCard";
import { ExerciseDto } from "./ClientService";
import "./ExerciseList.less";

export function ExerciseList({
    exercises,
    onExerciseChange, // értesíti a módosításáról
}: {
    exercises: ExerciseDto[];
    onExerciseChange: (updatedExercise: ExerciseDto, index: number) => void;
}) {
    return (
        <div className="ExerciseList">
            {/* A exercise-ok listája */}
            {exercises.map((exercise, index) => (
                <ExerciseCard
                    key={exercise.id} // Egyedi kulcs minden gyakorlat számára
                    exercise={exercise} // Az aktuális gyakorlat adatai
                    onChange={(updatedExercise) => onExerciseChange(updatedExercise, index)} 
                    // Az exercise változásait a szülőnek továbbítja az indexszel együtt
                />
            ))}
        </div>
    );
}
