// const onNoteDrop = (measureIndex: number, note: Note) => {
//     dispatch({ measureIndex, delegate: addNote(note) });
//   };

import { Note } from "@_types/music";
import { Measure } from ".";

//   const onNoteClick = (
//     measureIndex: number,
//     lineNumber: number,
//     startUnit: number
//   ) => {
//     dispatch({ measureIndex, delegate: deleteNote(lineNumber, startUnit) });
//   };

//   const onAddMeasure = () => {
//     dispatch({ measureIndex: -1, delegate: addMeasure() });
//   };

//   const onDeleteMeasure = (measureIndex: number) => {
//     dispatch({ measureIndex, delegate: deleteMeasure() });
//   };

//   const onDuplicateMeasure = (measureIndex: number) => {
//     dispatch({ measureIndex, delegate: duplicateMeasure() });
//   };

//   const onClearMeasure = (measureIndex: number) => {
//     dispatch({ measureIndex, delegate: clearMeasure() });
//   };

//   const onMoveMeasure = (measureIndex: number, newIndex: number) => {
//     dispatch({ measureIndex, delegate: moveMeasure(newIndex) });
//   };

//   const onPlay = (unitsPerMeasure: number, bpm: number) => {
//     const n: Note[] = [];
//     measures.forEach((measure, i) => {
//       n.push(...measureNotesToNotes(measure[0], i, 16));
//     });
//     playMeasures(n, unitsPerMeasure, bpm);
//   };

type MusicContext = {
  measures: Measure[];
  onNoteClick: (
    measureIndex: number,
    lineNumber: number,
    startUnit: number
  ) => void;
  onNoteDrop: (measureIndex: number, note: Note) => void;
  onAddMeasure: () => void;
  onDeleteMeasure: (measureIndex: number) => void;
  onDuplicateMeasures: (measureIndicies: number[]) => void;
  onClearMeasure: (measureIndex: number) => void;
  onMoveMeasure: (measureIndex: number, newIndex: number) => void;
  onPlay: (unitsPerMeasure: number, bpm: number) => void;
};

export const getMusicContext = (): MusicContext => {
  const fn = () => {};
  return {
    measures: [],
    onNoteClick: fn,
    onNoteDrop: fn,
    onAddMeasure: fn,
    onDeleteMeasure: fn,
    onDuplicateMeasures: fn,
    onClearMeasure: fn,
    onMoveMeasure: fn,
    onPlay: fn,
  };
};
