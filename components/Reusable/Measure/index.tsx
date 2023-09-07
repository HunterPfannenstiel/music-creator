import { FunctionComponent, ReactNode } from "react";
import classes from "./index.module.css";
import LedgerLine from "./LedgerLine";
import { MeasureNotes, Note, OccupiedUnits } from "../../../types/music";

interface MeasureProps {
  unitsPerMeasure: number;
  occupiedUnits: OccupiedUnits;
  notes: MeasureNotes;
  onNoteDrop: (noteDetails: Note) => void;
  onNoteClick: (lineNumber: number, startUnit: number) => void;
}

const Measure: FunctionComponent<MeasureProps> = ({
  unitsPerMeasure,
  occupiedUnits,
  notes,
  onNoteDrop,
  onNoteClick,
}) => {
  const ledgerLines: ReactNode[] = [];
  for (let i = 14; i > -3; i -= 2) {
    ledgerLines.push(
      <LedgerLine
        totalUnits={unitsPerMeasure}
        occupiedUnits={occupiedUnits}
        measureNotes={notes}
        lineNumber={i}
        onNoteDrop={onNoteDrop}
        onNoteClick={onNoteClick}
      />
    );
  }

  return <div className={classes.measure}>{ledgerLines}</div>;
};

export default Measure;
