import { FunctionComponent } from "react";
import classes from "./NoteSelection.module.css";
import QuarterNote from "../Notes/QuarterNote";
import WholeNote from "../Notes/WholeNote";
import EigthNote from "../Notes/EighthNote";
import SixteenthNote from "../Notes/SixteenthNote";
import Note from "..";
import HalfNote from "../Notes/HalfNote";
import { MeasureNote } from "../../../../types/music";

interface NoteSelectionProps {
  smallestUnit: number;
  selectedVal?: number;
}

const NoteSelection: FunctionComponent<NoteSelectionProps> = ({
  smallestUnit,
  selectedVal,
}) => {
  return (
    <div>
      <ul>
        {notes.map((note) => {
          if (note.details.val <= smallestUnit) {
            const Component = note.component;
            return (
              <Note
                noteDetails={note.details}
                isSelected={selectedVal === note.details.val}
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

const notes: { component: FunctionComponent; details: MeasureNote }[] = [
  { component: WholeNote, details: { val: 16, name: "whole" } },
  { component: HalfNote, details: { val: 8, name: "half" } },
  { component: QuarterNote, details: { val: 4, name: "quarter" } },
  { component: EigthNote, details: { val: 2, name: "eighth" } },
  { component: SixteenthNote, details: { val: 1, name: "sixteenth" } },
];

// val: number;
// name: keyof typeof noteMapping;
// sign?: string;
