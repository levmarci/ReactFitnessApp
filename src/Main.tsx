import { WorkoutDto } from "./ClientService";
import { LeftPane } from "./LeftPane";
import "./Main.less";
import { useEffect, useState } from "preact/hooks";
import { CenterPane } from "./CenterPane";
import { RightPane } from "./RightPane";

export function Main() {
    // Állapot az aktuálisan kiválasztott workout tárolására
    const [selected, setSelected] = useState<WorkoutDto | null>(null);
    
    // Aktuális aktív panel
    const [currentPane, setCurrentPane] = useState<"left" | "center" | "right">("left");
    
    // Állapot, amely jelzi, hogy az eszköz kis képernyős-e
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    // Ablakméret-figyelés, hogy kis képernyős-e
    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 750); // Kis képernyő határ: 750px
        };

        handleResize();
        window.addEventListener("resize", handleResize); // Listener hozzáadása

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // Bal oldalra visszalépés kezelése
    const onBack = () => {
        setCurrentPane("left"); // Bal oldali panel megjelenítése
        setSelected(null); // Nincs kiválasztott workout
    };

    // Jobb oldali panel megnyitása
    const onRight = () => {
        setCurrentPane("right");
    };

    return (
        <div className={`Main ${isSmallScreen ? currentPane : ""}`}>
            {/* Bal oldali panel */}
            <LeftPane 
                selected={selected} // Aktuálisan kiválasztott workout
                onSelect={(workout) => {
                    setSelected(workout); // Workout kiválasztása
                    if (isSmallScreen) setCurrentPane("center"); // Kis képernyőn középső panelre váltás
                }} 
                onRight={onRight} // Jobb oldali panelre váltás
            />
            
            {/* Középső panel csak akkor, ha van kiválasztott workout */}
            {selected && (
                <CenterPane 
                    workout={selected} // Az aktuális workout adatai
                    onBack={onBack} // Bal oldalra visszalépés
                />
            )}
            
            {/* Jobb oldali panel */}
            <RightPane onBack={onBack} /> {/* Bal oldalra visszalépés */}
        </div>
    );
}
