import { FunctionComponent } from "react";
import classes from "./index.module.css";
import QuarterNote from "../Notes/QuarterNote";
import WholeNote from "../Notes/WholeNote";
import EigthNote from "../Notes/EighthNote";
import SixteenthNote from "../Notes/SixteenthNote";
import HalfNote from "../Notes/HalfNote";
import { MeasureNote } from "../../../../types/music";
import NoteDropItem from "../NoteDropItem";

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
      <ul className={classes.container}>
        {notes.map((note) => {
          if (note.details.val <= smallestUnit) {
            const Component = note.component;
            return (
              <NoteDropItem
                className={classes.note}
                noteDetails={note.details}
                isSelected={selectedVal === note.details.val}
              >
                <Component />
              </NoteDropItem>
            );
          }
          return null;
        })}
      </ul>
    </div>
  );
};

export default NoteSelection;

const notes: {
  component: FunctionComponent;
  details: MeasureNote;
}[] = [
  { component: WholeNote, details: { val: 16, name: "whole" } },
  { component: HalfNote, details: { val: 8, name: "half" } },
  { component: QuarterNote, details: { val: 4, name: "quarter" } },
  { component: EigthNote, details: { val: 2, name: "eighth" } },
  {
    component: () => {
      return <>"D8"</>;
    },
    details: { val: 3, name: "dottedEighth" },
  },
  { component: SixteenthNote, details: { val: 1, name: "sixteenth" } },
];

// val: number;
// name: keyof typeof noteMapping;
// sign?: string;
