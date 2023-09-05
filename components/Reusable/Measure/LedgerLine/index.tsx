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
      <LedgerUnit
        isLedgerSpace
        length={length}
        onNoteClick={() => {
          onNoteClick(lineNumber + 1, i - length + 1);
        }}
        note={SpaceNote ? <SpaceNote /> : undefined}
        containsNote={!!occupiedUnits[i]}
        onNoteDrop={(noteInfo) => {
          if (!occupiedUnits[i]) {
            const noteDetails = JSON.parse(noteInfo) as MeasureNote;
            if (i + noteDetails.val > totalUnits) return;
            for (let j = i; j < i + noteDetails.val; j++) {
              if (occupiedUnits[j]) return;
            }
            onNoteDrop({ ...noteDetails, x: i, y: lineNumber + 1 });
          }
        }}
      />
    );
    ledgerLine.push(
      <LedgerUnit
        isLedgerSpace={false}
        length={length}
        note={LedgerNote ? <LedgerNote /> : undefined}
        onNoteClick={() => {
          onNoteClick(lineNumber, i - length + 1);
        }}
        containsNote={!!occupiedUnits[i]}
        onNoteDrop={(noteInfo) => {
          if (!occupiedUnits[i]) {
            const noteDetails = JSON.parse(noteInfo) as MeasureNote;
            onNoteDrop({ ...noteDetails, x: i, y: lineNumber });
          }
        }}
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
