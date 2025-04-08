import './WorkoutCard.less';
import { WorkoutDto } from "./ClientService";
import { IconButton } from './IconButton';

export function WorkoutCard({ workout, selected, onSelect, onDelete }: {
    workout: WorkoutDto,
    selected: boolean,
    onSelect: () => void,
    onDelete: () => void,
}) {
    // A workout dátumának konvertálása
    let workoutDate = new Date(workout.date);

    return (
        <div className={"WorkoutCard" + (selected ? " selected" : "")}>
            
            {/* Delete gomb, amely törli a workout-ot */}
            <IconButton 
                icon="delete"  // Az ikon, amit a gombon látunk
                onClick={() => onDelete()}  // Törlés eseménykezelő
            />

            {/* A workout adatai */}
            <div className="content" onClick={() => onSelect()}>
                {/* A workout neve */}
                <h3>{workout.name}</h3>

                {/* A workout dátuma */}
                <time dateTime={workoutDate.toISOString()}>
                    {/* A dátum formázása */}
                    {workoutDate.toLocaleString('en-EN', {
                        day: 'numeric',       // A nap számjegy formátumban
                        month: 'long',        // A hónap teljes neve
                        year: 'numeric',      // Az év számjegy formátumban
                    })}
                </time>
            </div>
        </div>
    );
}
