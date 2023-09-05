import { CSSProperties, FunctionComponent, ReactNode } from "react";
import classes from "./index.module.css";
import { MeasureNotes, OccupiedUnits } from "../../../../types/music";
import { noteMapping } from "../../../../utils/notes";
import LedgerUnit from "./LedgerUnit";

interface LedgerLineProps {
  occupiedUnits: OccupiedUnits;
  measureNotes: MeasureNotes;
  totalUnits: number;
  lineNumber: number;
}

const LedgerLine: FunctionComponent<LedgerLineProps> = ({
  occupiedUnits,
  measureNotes,
  totalUnits,
  lineNumber,
}) => {
  const ledgerSpace: ReactNode[] = [];
  const ledgerLine = [];
  for (let i = 0; i < totalUnits; i++) {
    let length = occupiedUnits[i] || 1;
    const spaceNotes = measureNotes[lineNumber + 1];
    const lineNotes = measureNotes[lineNumber];
    const SpaceNote = spaceNotes && noteMapping[spaceNotes[i]?.name];
    const LedgerNote = lineNotes && noteMapping[lineNotes[i]?.name];
    ledgerSpace.push(
      <LedgerUnit
        isLedgerSpace
        length={length}
        note={SpaceNote ? <SpaceNote /> : undefined}
        containsNote={!!occupiedUnits[i]}
      />
    );
    ledgerLine.push(
      <LedgerUnit
        isLedgerSpace={false}
        length={length}
        note={LedgerNote ? <LedgerNote /> : undefined}
        containsNote={!!occupiedUnits[i]}
      />
    );
    i += length - 1;
  }
  return (
    <div
      className={classes.ledger_line}
      style={{ "--unit-percent": 100 / totalUnits + "%" } as CSSProperties}
    >
      <ul className={classes.container}>{ledgerSpace}</ul>
      <ul className={classes.container}>{ledgerLine}</ul>
    </div>
  );
};

export default LedgerLine;
