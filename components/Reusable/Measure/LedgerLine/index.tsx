import { CSSProperties, FunctionComponent, ReactNode } from "react";
import classes from "./index.module.css";
import {
  MeasureNote,
  MeasureNotes,
  Note,
  OccupiedUnits,
} from "../../../../types/music";
import { noteMapping } from "../../../../utils/notes";
import LedgerUnit from "./LedgerUnit";

interface LedgerLineProps {
  occupiedUnits: OccupiedUnits;
  measureNotes: MeasureNotes;
  totalUnits: number;
  lineNumber: number;
  onNoteDrop: (noteDetails: Note) => void;
  onNoteClick: (lineNumber: number, startUnit: number) => void;
}

const LedgerLine: FunctionComponent<LedgerLineProps> = ({
  occupiedUnits,
  measureNotes,
  totalUnits,
  lineNumber,
  onNoteDrop,
  onNoteClick,
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
      getLedgerUnit(
        occupiedUnits,
        lineNumber + 1,
        onNoteDrop,
        onNoteClick,
        true,
        i,
        SpaceNote ? <SpaceNote /> : undefined
      )
    );
    ledgerLine.push(
      getLedgerUnit(
        occupiedUnits,
        lineNumber,
        onNoteDrop,
        onNoteClick,
        false,
        i,
        LedgerNote ? <LedgerNote /> : undefined
      )
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

const getLedgerUnit = (
  occupiedUnits: OccupiedUnits,
  lineNumber: number,
  onNoteDrop: (noteDetails: Note) => void,
  onNoteClick: (lineNumber: number, startUnit: number) => void,
  isLedgerSpace: boolean,
  startUnit: number,
  note?: ReactNode
) => {
  let length = occupiedUnits[startUnit] || 1;
  return (
    <LedgerUnit
      outOfRange={lineNumber < 0 || lineNumber > 8}
      isLedgerSpace={isLedgerSpace}
      length={length}
      note={note}
      onNoteClick={() => {
        onNoteClick(lineNumber, startUnit);
      }}
      containsNote={!!occupiedUnits[startUnit]}
      onNoteDrop={(noteInfo) => {
        if (!occupiedUnits[startUnit]) {
          const noteDetails = JSON.parse(noteInfo) as MeasureNote;
          onNoteDrop({ ...noteDetails, x: startUnit, y: lineNumber });
        }
      }}
    />
  );
};
