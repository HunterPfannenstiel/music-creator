import { FunctionComponent, ReactNode } from "react";
import classes from "./index.module.css";
import LedgerLine from "./LedgerLine";
import { MeasureNotes } from "@_types/music";

interface ViewMeasureProps {
  notes: MeasureNotes;
  unitsPerMeasure: number;
}

const ViewMeasure: FunctionComponent<ViewMeasureProps> = ({
  notes,
  unitsPerMeasure,
}) => {
  const ledgerLines: ReactNode[] = [];
  for (let i = 14; i > -3; i -= 2) {
    ledgerLines.push(
      <LedgerLine
        unitsPerMeasure={unitsPerMeasure}
        measureNotes={notes}
        lineNumber={i}
      />
    );
  }
  return <div className={classes.measure}>{ledgerLines}</div>;
};

export default ViewMeasure;
