import { useReducer } from "react";
import { MeasureNotes, Note, OccupiedUnits } from "../../../types/music";
import { measureNotesToNotes, playMeasures } from "../../../utils/notes";
import {
  MeasureDelegate,
  addMeasure,
  addNote,
  deleteMeasure,
  deleteNote,
} from "./delegates";

export type Measure = [MeasureNotes, OccupiedUnits];

const reducer = (
  state: Measure[],
  payload: {
    measureIndex: number;
    delegate: MeasureDelegate;
  }
) => {
  const newState = [...state];
  if (payload.measureIndex !== -1) {
    newState[payload.measureIndex] = [
      { ...newState[payload.measureIndex][0] },
      { ...newState[payload.measureIndex][1] },
    ];
  }
  payload.delegate(newState, payload.measureIndex);
  return newState;
};

const useMeasures = () => {
  const [measures, dispatch] = useReducer(reducer, []);

  const onNoteDrop = (measureIndex: number, note: Note) => {
    dispatch({ measureIndex, delegate: addNote(note) });
  };

  const onNoteClick = (
    measureIndex: number,
    lineNumber: number,
    startUnit: number
  ) => {
    dispatch({ measureIndex, delegate: deleteNote(lineNumber, startUnit) });
  };

  const onAddMeasure = () => {
    dispatch({ measureIndex: -1, delegate: addMeasure() });
  };

  const onDeleteMeasure = (measureIndex: number) => {
    dispatch({ measureIndex, delegate: deleteMeasure() });
  };

  const onPlay = () => {
    const n: Note[] = [];
    measures.forEach((measure, i) => {
      n.push(...measureNotesToNotes(measure[0], i, 16));
    });
    playMeasures(n, 16, 113);
  };

  return {
    measures,
    onNoteDrop,
    onNoteClick,
    onAddMeasure,
    onDeleteMeasure,
    onPlay,
  };
};

export default useMeasures;
