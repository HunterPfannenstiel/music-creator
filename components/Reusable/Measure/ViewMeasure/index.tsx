import { FunctionComponent, ReactNode } from "react";
import classes from "./index.module.css";

import { MeasureNotes } from "@_types/music";
import LedgerLine from "./LedgerLine";

interface ViewMeasureProps {
  notes: MeasureNotes;
  unitsPerMeasure: number;
  width?: string;
  isSelected?: boolean;
}

const ViewMeasure: FunctionComponent<ViewMeasureProps> = ({
  notes,
  unitsPerMeasure,
  width,
  isSelected,
}) => {
  const aboveLines: ReactNode[] = [];
  const ledgerLines: ReactNode[] = [];
  const belowLines: ReactNode[] = [];
  for (let i = 14; i > -3; i -= 2) {
    if (i >= 8) {
      aboveLines.push(
        <LedgerLine
          unitsPerMeasure={unitsPerMeasure}
          measureNotes={notes}
          lineNumber={i}
        />
      );
    } else if (i < 0) {
      belowLines.push(
        <LedgerLine
          unitsPerMeasure={unitsPerMeasure}
          measureNotes={notes}
          lineNumber={i}
        />
      );
    } else {
      ledgerLines.push(
        <LedgerLine
          unitsPerMeasure={unitsPerMeasure}
          measureNotes={notes}
          lineNumber={i}
        />
      );
    }
  }
  return (
    <div
      className={isSelected ? classes.selected : classes.measure}
      style={{ width }}
    >
      {aboveLines}
      <div className={classes.main_lines}>{ledgerLines}</div>
      {belowLines}
    </div>
  );
};

export default ViewMeasure;
