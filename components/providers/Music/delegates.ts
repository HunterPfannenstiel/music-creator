import { Measure } from "../../hooks/useMeasures";
import { Note } from "../../../types/music";
import { deepCopy } from "../../../utils";

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
    if (notes[lineNumber]) delete notes[lineNumber][startUnit];
    delete occupiedunits[startUnit];
  };

export const addMeasure = (): MeasureDelegate => (measures) => {
  measures.push([{}, {}]);
};

export const deleteMeasure =
  (): MeasureDelegate => (measures, measureIndex) => {
    measures.splice(measureIndex, 1);
  };

export const duplicateMeasures =
  (measureIndcies: number[]): MeasureDelegate =>
  (measures, _) => {
    if (!measureIndcies.length) return;
    const newMeasures = measureIndcies.map((index) =>
      deepCopy(measures[index])
    );
    measures.splice(measureIndcies[0], 0, ...newMeasures);
  };

export const clearMeasure = (): MeasureDelegate => (measures, measureIndex) => {
  measures[measureIndex] = [{}, {}];
};

export const moveMeasure =
  (newIndex: number): MeasureDelegate =>
  (measures, measureIndex) => {
    const measure = measures.splice(measureIndex, 1)[0];
    measures.splice(newIndex, 0, measure);
  };
