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
  // onDeleteMeasure: () => void;
  onClearMeasure: () => void;
  // onDuplicateMeasure: () => void;
}

const Measure: FunctionComponent<MeasureProps> = ({
  unitsPerMeasure,
  occupiedUnits,
  notes,

  onNoteDrop,
  onNoteClick,
  onClearMeasure,
}) => {
  const ledgerLines: ReactNode[] = [];
  for (let i = 14; i > -3; i -= 2) {
    ledgerLines.push(
      <LedgerLine
        unitsPerMeasure={unitsPerMeasure}
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
        <div className={classes.btns}>
          {/* <button onClick={onDeleteMeasure}>X</button> */}
          <button onClick={onClearMeasure}>Clear</button>
          {/* <button onClick={onDuplicateMeasure}>Duplicate</button> */}
        </div>
      </div>
      {ledgerLines}
    </div>
  );
};

export default Measure;
