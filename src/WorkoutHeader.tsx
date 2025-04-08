import "./WorkoutHeader.less";

export function WorkoutHeader({
    name,
    onNameChange,
}: {
    name: string;
    onNameChange: (newName: string) => void;
}) {
    return (
        <div className="WorkoutHeader">
            <input
                type="text"
                value={name}
                onChange={(e) => onNameChange(e.currentTarget.value)}
                placeholder="Workout Name"
            />
        </div>
    );
}
