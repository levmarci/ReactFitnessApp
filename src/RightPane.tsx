import { IconButton } from "./IconButton";
import "./RightPane.less";
import { Stopwatch } from "./Stopwatch";

export function RightPane({ onBack, }: {
    onBack: () => void;
}) {

    return <div class="RightPane">
        <div className="backButton">
            <IconButton onClick={onBack} text="Back" icon="arrow_back"/>
        </div>
        <Stopwatch />
    </div>
}