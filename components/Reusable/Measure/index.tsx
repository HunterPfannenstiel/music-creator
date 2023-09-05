import { FunctionComponent } from "react";
import classes from "./index.module.css";
import LedgerLine from "./LedgerLine";
import { MeasureNotes, OccupiedUnits } from "../../../types/music";

interface MeasureProps {
  unitsPerMeasure: number;
}

const Measure: FunctionComponent<MeasureProps> = ({ unitsPerMeasure }) => {
  const occupiedUnits: OccupiedUnits = { 0: 2, 4: 1 };
  const notes: MeasureNotes = {
    0: { 0: { val: 2, name: "eighth" } },
    1: { 4: { val: 1, name: "sixteenth" } },
  };
  return (
    <div className={classes.measure}>
      <LedgerLine
        totalUnits={unitsPerMeasure}
        occupiedUnits={occupiedUnits}
        measureNotes={notes}
        lineNumber={8}
      />
      <LedgerLine
        totalUnits={unitsPerMeasure}
        occupiedUnits={occupiedUnits}
        measureNotes={notes}
        lineNumber={6}
      />
      <LedgerLine
        totalUnits={unitsPerMeasure}
        occupiedUnits={occupiedUnits}
        measureNotes={notes}
        lineNumber={4}
      />
      <LedgerLine
        totalUnits={unitsPerMeasure}
        occupiedUnits={occupiedUnits}
        measureNotes={notes}
        lineNumber={2}
      />
      <LedgerLine
        totalUnits={unitsPerMeasure}
        occupiedUnits={occupiedUnits}
        measureNotes={notes}
        lineNumber={0}
      />
    </div>
  );
};

export default Measure;
