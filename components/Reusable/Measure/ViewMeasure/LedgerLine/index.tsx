import { FunctionComponent, ReactNode } from "react";
import { MeasureNote, MeasureNotes } from "@_types/music";
import { noteMapping } from "@_utils/notes";
import Unit from "../../Unit";
import LedgerConatiner from "../../LedgerContainer";

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

type Notes =
  | {
      [startUnit: string]: MeasureNote;
    }
  | undefined;

const getUnits = (
  unitsPerMeasure: number,
  notes: Notes,
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
      const noteDetails = notes[i];
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
          containsNote
          lineThicknessScale={0.3}
        >
          <Note />
        </Unit>
      );
      i += noteDetails.val - 1;
      length = 0;
    }
  }
  if (length) {
    nodeArray.push(
      <Unit
        length={length}
        unitPercent={unitWidth}
        isSpace={isSpace}
        isOutOfRange={outOfRange}
        lineThicknessScale={0.3}
      />
    );
  }
  return nodeArray;
};
