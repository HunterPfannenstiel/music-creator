import { FunctionComponent, ReactNode } from "react";
import classes from "./index.module.css";
import DropContainer from "../../../DragDrop/DropContainer";
import Unit from "./Unit";

interface LedgerUnitProps {
  length: number;
  unitPercent: string;
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
  note,
  containsNote,
  isLedgerSpace,
  onNoteDrop,
  onNoteClick,
  outOfRange,
}) => {
  if (!containsNote) {
    return (
      <Unit
        isSpace={isLedgerSpace}
        isOutOfRange={!!outOfRange}
        unitPercent={unitPercent}
        length={length}
      >
        <DropContainer
          dropHandler={(e) => {
            console.log(e);
            onNoteDrop?.call(null, e);
          }}
          className={classes.drop_container}
          dataName="note"
        />
      </Unit>
    );
  } else
    return (
      <Unit
        isSpace={isLedgerSpace}
        unitPercent={unitPercent}
        isOutOfRange={!!outOfRange}
        length={length}
      >
        {note && (
          <div className={classes.note} onClick={onNoteClick}>
            {note}
          </div>
        )}
      </Unit>
    );
};

export default LedgerUnit;
