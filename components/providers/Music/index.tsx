import { ReactNode, createContext, useContext, useReducer } from "react";

const Music = createContext(getMusicContext());

import { FunctionComponent } from "react";
import classes from "./MusicProvider.module.css";
import {
  MeasureDelegate,
  addMeasure,
  addNote,
  clearMeasure,
  deleteMeasure,
  deleteNote,
  duplicateMeasures,
  moveMeasure,
} from "@_providers/Music/delegates";
import { MeasureNotes, Note, OccupiedUnits } from "@_types/music";
import { measureNotesToNotes, playMeasures } from "@_utils/notes";
import { getMusicContext } from "./utils";

interface MusicProviderProps {
  children: ReactNode;
}

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

const MusicProvider: FunctionComponent<MusicProviderProps> = ({ children }) => {
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

  const onDuplicateMeasures = (measureIndices: number[]) => {
    dispatch({ measureIndex: -1, delegate: duplicateMeasures(measureIndices) });
  };

  const onClearMeasure = (measureIndex: number) => {
    dispatch({ measureIndex, delegate: clearMeasure() });
  };

  const onMoveMeasure = (measureIndex: number, newIndex: number) => {
    dispatch({ measureIndex, delegate: moveMeasure(newIndex) });
  };

  const onPlay = (unitsPerMeasure: number, bpm: number) => {
    const n: Note[] = [];
    console.log(measures);
    measures.forEach((measure, i) => {
      n.push(...measureNotesToNotes(measure[0], i, 16));
    });
    playMeasures(n, unitsPerMeasure, bpm);
  };
  return (
    <Music.Provider
      value={{
        measures,
        onNoteDrop,
        onNoteClick,
        onAddMeasure,
        onDeleteMeasure,
        onDuplicateMeasures,
        onClearMeasure,
        onMoveMeasure,
        onPlay,
      }}
    >
      {children}
    </Music.Provider>
  );
};

export default MusicProvider;

export const useMusic = () => useContext(Music);
