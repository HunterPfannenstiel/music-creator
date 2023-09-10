import { FunctionComponent, ReactNode } from "react";
import { MeasureNote, MeasureNotes } from "@_types/music";
import Unit from "components/Reusable/Measure/LedgerLine/LedgerUnit/Unit";
import { noteMapping } from "@_utils/notes";
import LedgerConatiner from "components/Reusable/Measure/LedgerContainer";

interface LedgerLineProps {
  measureNotes: MeasureNotes;
  unitsPerMeasure: number;
  lineNumber: number;
}

const LedgerLine: FunctionComponent<LedgerLineProps> = ({
  measureNotes,
  unitsPerMeasure,
  lineNumber,
}) => {
  const lineNotes = measureNotes[lineNumber];
  const spaceNotes = measureNotes[lineNumber + 1];

  const unitWidth = 100 / unitsPerMeasure + "%";
  const outOfRange = lineNumber < 0 || lineNumber > 8;
  const ledgerLine = getUnits(
    unitsPerMeasure,
    lineNotes,
    unitWidth,
    outOfRange,
    false
  );
  const ledgerSpace = getUnits(
    unitsPerMeasure,
    spaceNotes,
    unitWidth,
    outOfRange,
    true
  );

  return <LedgerConatiner ledgerSpace={ledgerSpace} ledgerLine={ledgerLine} />;
};

export default LedgerLine;

const getUnits = (
  unitsPerMeasure: number,
  notes:
    | {
        [startUnit: string]: MeasureNote;
      }
    | undefined,
  unitWidth: string,
  outOfRange: boolean,
  isSpace: boolean
) => {
  if (!notes) {
    return [
      <Unit
        length={16}
        unitPercent={unitWidth}
        isSpace={isSpace}
        isOutOfRange={outOfRange}
        lineThicknessScale={0.3}
      />,
    ];
  }
  const nodeArray: ReactNode[] = [];
  let length = 0;
  for (let i = 0; i < unitsPerMeasure; i++) {
    length++;
    if (notes[i]) {
      const noteDetails = notes[length];
      const Note = noteMapping[noteDetails.name];
      length > 1 &&
        nodeArray.push(
          <Unit
            length={length - 1}
            unitPercent={unitWidth}
            isSpace={isSpace}
            isOutOfRange={outOfRange}
            lineThicknessScale={0.3}
          />
        );
      nodeArray.push(
        <Unit
          length={noteDetails.val}
          unitPercent={unitWidth}
          isSpace={isSpace}
          isOutOfRange={outOfRange}
          lineThicknessScale={0.3}
        >
          <Note />
        </Unit>
      );
      i += noteDetails.val;
      length = 0;
    }
  }
  return nodeArray;
};
