// Egy adott exercise adatait reprezentáló típus
export type ExerciseDto = {
    id: number; // Egyedi azonosító
    type: string; // exercise típusa
    weight: number; // Használt súly
    repetitions: number; // Ismétlések száma
    restTime: number; // Pihenőidő másodpercekben
    notes?: string; // Opcionális megjegyzések
};

// Egy edzés adatait reprezentáló típus
export type WorkoutDto = {
    id: number; // Egyedi azonosító
    name: string; // A neve
    date: Date; // A dátuma
    exercises: ExerciseDto[]; // A exercise-ok listája
};

export type StorageDto = {
    workouts: WorkoutDto[];
};

class WorkoutService {
    storage: StorageDto;
    #listeners: (() => void)[] = [];

    constructor() {
        // Betöltés, ha létezik
        const stored = localStorage.getItem('storage');
        if (stored) {
            try {
                this.storage = JSON.parse(stored) as StorageDto;
            } catch (error) {
                this.storage = this.getDefaultStorage();
            }
        } else {
            this.storage = this.getDefaultStorage();
        }
    }

    // Új workout hozzáadása, mentés és értesítések küldése
    addWorkout() {
        const workout: WorkoutDto = {
            id: this.storage.workouts.length + 1, // ID beállítása
            name: `Workout Number ${this.storage.workouts.length + 1}`,
            date: new Date(),
            exercises: []
        };

        this.storage.workouts.push(workout);  // Workout hozzáadása
        this.setStorage(this.storage);           // mentés a localStorage-ba
        this.notifyListeners();              // Értesítések küldése
    }

    deleteWorkout(workoutId: number) {
        // Az adott ID-hez tartozó workout eltávolítása a listából
        this.storage.workouts = this.storage.workouts.filter(workout => workout.id !== workoutId);
    
        // Az ID-k újraszámozása
        this.storage.workouts.forEach((workout, index) => {
            workout.id = index + 1;
        });
    
        this.setStorage(this.storage); // mentés localStorage-ba
        this.notifyListeners();   // Értesítések küldése a változásról
    }

    saveWorkout(workout: WorkoutDto) {
        const existingWorkoutIndex = this.storage.workouts.findIndex(w => w.id === workout.id);
        if (existingWorkoutIndex !== -1) {
            this.storage.workouts[existingWorkoutIndex] = workout;
        } else {
            this.storage.workouts.push(workout);
        }
        this.setStorage(this.storage);
        this.notifyListeners();
    }

    // Storage beállítása és mentése
    setStorage(storage: StorageDto) {
        this.storage = storage;
        localStorage.setItem('storage', JSON.stringify(this.storage));
    }

    // Alapértelmezett StorageDto struktúra létrehozása
    private getDefaultStorage(): StorageDto {
        return {
            workouts: [],
        };
    }

    // Feliratkozás az értesítésekre
    addListener(listener: () => void) {
        this.#listeners.push(listener);
    }

    // Leiratkozás az értesítésekről
    removeListener(listener: () => void) {
        this.#listeners = this.#listeners.filter(l => l !== listener);
    }

    private notifyListeners() {
        for (let listener of this.#listeners) {
            listener();
        }
    }
}

export const workoutService = new WorkoutService();