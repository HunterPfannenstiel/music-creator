import { FunctionComponent, ReactNode } from "react";
import { MeasureNote, MeasureNotes, Note, OccupiedUnits } from "@_types/music";
import { noteMapping } from "@_utils/notes";
import LedgerUnit from "./LedgerUnit";
import LedgerConatiner from "../../LedgerContainer";

interface LedgerLineProps {
  occupiedUnits: OccupiedUnits;
  measureNotes: MeasureNotes;
  unitsPerMeasure: number;
  lineNumber: number;
  showOutline: boolean;
  onNoteDrop: (noteDetails: Note) => void;
  onNoteClick: (lineNumber: number, startUnit: number) => void;
}

const LedgerLine: FunctionComponent<LedgerLineProps> = ({
  occupiedUnits,
  measureNotes,
  unitsPerMeasure,
  lineNumber,
  showOutline,
  onNoteDrop,
  onNoteClick,
}) => {
  const ledgerSpace: ReactNode[] = [];
  const ledgerLine = [];
  const unitWidth = 100 / unitsPerMeasure;
  for (let i = 0; i < unitsPerMeasure; i++) {
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
        unitWidth,
        showOutline,
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
        unitWidth,
        showOutline,
        LedgerNote ? <LedgerNote /> : undefined
      )
    );
    i += length - 1;
  }
  return <LedgerConatiner ledgerSpace={ledgerSpace} ledgerLine={ledgerLine} />;
};

export default LedgerLine;

const getLedgerUnit = (
  occupiedUnits: OccupiedUnits,
  lineNumber: number,
  onNoteDrop: (noteDetails: Note) => void,
  onNoteClick: (lineNumber: number, startUnit: number) => void,
  isLedgerSpace: boolean,
  startUnit: number,
  unitWidth: number,
  showOutline: boolean,
  note?: ReactNode
) => {
  let length = occupiedUnits[startUnit] || 1;
  return (
    <LedgerUnit
      unitPercent={unitWidth + "%"}
      outOfRange={lineNumber < 0 || lineNumber > 8}
      isLedgerSpace={isLedgerSpace}
      length={length}
      note={note}
      showOutline={showOutline}
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
