import { FunctionComponent } from "react";
import classes from "./NoteSelection.module.css";
import QuarterNote from "../Notes/QuarterNote";
import WholeNote from "../Notes/WholeNote";
import EigthNote from "../Notes/EighthNote";
import SixteenthNote from "../Notes/SixteenthNote";
import Note from "..";

interface NoteSelectionProps {
  smallestUnit: number;
  onNoteClick: (unitValue: number) => void;
  selectedVal?: number;
}

const NoteSelection: FunctionComponent<NoteSelectionProps> = ({
  smallestUnit,
  onNoteClick,
  selectedVal,
}) => {
  return (
    <div>
      <ul>
        {notes.map((note) => {
          if (note.unitValue <= smallestUnit) {
            const Component = note.component;
            return (
              <Note
                onClick={onNoteClick.bind(null, note.unitValue)}
                isSelected={selectedVal === note.unitValue}
              >
                <Component />
              </Note>
            );
          }
          return null;
        })}
      </ul>
    </div>
  );
};

export default NoteSelection;

const notes = [
  { unitValue: 1, component: WholeNote },
  { unitValue: 4, component: QuarterNote },
  { unitValue: 8, component: EigthNote },
  { unitValue: 16, component: SixteenthNote },
];
