import { Measure } from ".";
import { Note } from "../../../types/music";

export type MeasureDelegate = (
  measures: Measure[],
  measureIndex: number
) => void;

export const addNote =
  (note: Note): MeasureDelegate =>
  (measures, measureIndex) => {
    const [notes, occupiedUnits] = measures[measureIndex];
    const newNote = { val: note.val, name: note.name };
    if (notes[note.y]) {
      notes[note.y] = {
        ...notes[note.y],
        [note.x]: newNote,
      };
    } else {
      notes[note.y] = { [note.x]: newNote };
    }

    occupiedUnits[note.x] = note.val;
  };

export const deleteNote =
  (lineNumber: number, startUnit: number): MeasureDelegate =>
  (measures, measureIndex) => {
    const [notes, occupiedunits] = measures[measureIndex];
    delete notes[lineNumber][startUnit];
    delete occupiedunits[startUnit];
  };

export const addMeasure = (): MeasureDelegate => (measures) => {
  measures.push([{}, {}]);
};

export const deleteMeasure =
  (): MeasureDelegate => (measures, measureIndex) => {
    measures.splice(measureIndex, 1);
  };