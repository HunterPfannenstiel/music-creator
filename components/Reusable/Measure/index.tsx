import { FunctionComponent, ReactNode } from "react";
import classes from "./index.module.css";
import LedgerLine from "./LedgerLine";
import { MeasureNotes, Note, OccupiedUnits } from "../../../types/music";

interface MeasureProps {
  unitsPerMeasure: number;
  occupiedUnits: OccupiedUnits;
  notes: MeasureNotes;
  measureNumber: number;
  onNoteDrop: (noteDetails: Note) => void;
  onNoteClick: (lineNumber: number, startUnit: number) => void;
  onDeleteMeasure: () => void;
  onClearMeasure: () => void;
  onDuplicateMeasure: () => void;
}

const Measure: FunctionComponent<MeasureProps> = ({
  unitsPerMeasure,
  occupiedUnits,
  notes,
  measureNumber,
  onNoteDrop,
  onNoteClick,
  onDeleteMeasure,
  onClearMeasure,
  onDuplicateMeasure,
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

  return (
    <div className={classes.measure}>
      <div className={classes.toolbar}>
        <p>{measureNumber}</p>
        <div className={classes.btns}>
          <button onClick={onDeleteMeasure}>X</button>
          <button onClick={onClearMeasure}>Clear</button>
          <button onClick={onDuplicateMeasure}>Duplicate</button>
        </div>
      </div>
      {ledgerLines}
    </div>
  );
};

export default Measure;
