import { FunctionComponent, ReactNode } from "react";
import classes from "./index.module.css";
import Unit from "../../../Unit";
import DropContainer from "components/Reusable/DragDrop/DropContainer";

interface LedgerUnitProps {
  length: number;
  unitPercent: string;
  showOutline: boolean;
  note?: ReactNode;
  containsNote?: boolean;
  isLedgerSpace: boolean;
  onNoteDrop?: (noteInfo: string) => void;
  onNoteClick?: () => void;
  outOfRange?: boolean; //If the note is above/below the main measure lines
}

const LedgerUnit: FunctionComponent<LedgerUnitProps> = ({
  length = 1,
  unitPercent,
  showOutline,
  note,
  containsNote,
  isLedgerSpace,
  onNoteDrop,
  onNoteClick,
  outOfRange,
}) => {
  if (!containsNote) {
    return (
      <DropContainer
        dropHandler={(e) => {
          console.log(e);
          onNoteDrop?.call(null, e);
        }}
        dataName="note"
        as={Unit}
        isSpace={isLedgerSpace}
        isOutOfRange={!!outOfRange}
        unitPercent={unitPercent}
        length={length}
        showOutline={showOutline}
      />
    );
  } else
    return (
      <Unit
        isSpace={isLedgerSpace}
        unitPercent={unitPercent}
        isOutOfRange={!!outOfRange}
        length={length}
        containsNote={!!note}
        onClick={onNoteClick}
        showOutline={showOutline}
      >
        {note}
      </Unit>
    );
};

export default LedgerUnit;
