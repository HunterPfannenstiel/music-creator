import { FunctionComponent, ReactNode } from "react";
import classes from "./index.module.css";
import LedgerLine from "./LedgerLine";
import { MeasureNotes, Note, OccupiedUnits } from "@_types/music";

interface EditableMeasureProps {
  unitsPerMeasure: number;
  occupiedUnits: OccupiedUnits;
  notes: MeasureNotes;
  onNoteDrop: (noteDetails: Note) => void;
  onNoteClick: (lineNumber: number, startUnit: number) => void;
  showOutline: boolean;
  // onDeleteMeasure: () => void;
  onClearMeasure: () => void;
  // onDuplicateMeasure: () => void;
}

const EditableMeasure: FunctionComponent<EditableMeasureProps> = ({
  unitsPerMeasure,
  occupiedUnits,
  notes,
  showOutline,
  onNoteDrop,
  onNoteClick,
  onClearMeasure,
}) => {
  const ledgerLines: ReactNode[] = [];
  for (let i = 14; i > -3; i -= 2) {
    ledgerLines.push(
      <LedgerLine
        showOutline={showOutline}
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

export default EditableMeasure;
