import { FunctionComponent } from "react";
import classes from "./index.module.css";

type Accidental = "Flat" | "Natural" | "Sharp" | "None";

interface NoteTooltipProps {
  onAccidentalChange: (a: Accidental) => void;
  initialAccidental?: Accidental;
}

const NoteTooltip: FunctionComponent<NoteTooltipProps> = ({
  onAccidentalChange,
}) => {
  return (
    <div className={classes.tooltip}>
      <p onClick={onAccidentalChange.bind(null, "Flat")}>Flat</p>
      <p onClick={onAccidentalChange.bind(null, "Natural")}>Natural</p>
      <p onClick={onAccidentalChange.bind(null, "Sharp")}>Sharp</p>
      <p onClick={onAccidentalChange.bind(null, "None")}>None</p>
    </div>
  );
};

export default NoteTooltip;
