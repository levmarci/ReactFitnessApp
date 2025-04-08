import "./TextInput.less";

export type TextInputProps = {
    label: string;
    value: string | number;
    onChange: (value: string | number) => void;
    placeholder?: string;
    type?: "text" | "number";
    unit?: string;
}

export function TextInput({ label, value, onChange, placeholder, type = "text", unit }: TextInputProps) {
    return (
        <div className="field">
            <label>{label}</label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(type === "number" ? parseFloat(e.currentTarget.value) || 0 : e.currentTarget.value)}
                placeholder={placeholder}
            />
            {unit && <span className="unit">{unit}</span>}
        </div>
    );
}
