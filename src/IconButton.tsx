import "./IconButton.less";

export type IconButtonProps = {
    icon: string; // Az ikon neve, amely a Google Material Symbols alapján kerül megjelenítésre
    text?: string;  // Opcionális szöveg, amely az ikon mellett jelenik meg
    onClick?: () => void;  // Eseménykezelő függvény, amely a gomb kattintására fut le
};

export function IconButton({ icon, text, onClick }: IconButtonProps) {
    return (
        <button 
            className="icon-button"
            onClick={onClick} // A kattintás eseménykezelőjének hozzárendelése
        >
            {/* Az ikon megjelenítése Google Material Symbols-ból */}
            <span className="material-symbols-outlined">
                {icon} 
            </span>
            {/* Ha van szöveg, az ikon után jelenik meg */}
            {text && " " + text}
        </button>
    );
}
