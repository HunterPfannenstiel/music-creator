import { CSSProperties, FunctionComponent, ReactNode } from "react";
import classes from "./index.module.css";

import { concatClassNames } from "../../../../../utils";
import DropContainer from "../../../DragDrop/DropContainer";

interface LedgerUnitProps {
  length?: number;
  note?: ReactNode;
  containsNote?: boolean;
  isLedgerSpace: boolean;
  onNoteDrop: (noteInfo: string) => void;
}

const LedgerUnit: FunctionComponent<LedgerUnitProps> = ({
  length = 1,
  note,
  containsNote,
  isLedgerSpace,
  onNoteDrop,
}) => {
  if (!containsNote) {
    return (
      <DropContainer
        dropHandler={onNoteDrop}
        dataName="note"
        className={isLedgerSpace ? classes.space : classes.line}
        style={{ "--length": length } as CSSProperties}
      />
    );
  } else
    return (
      <li
        className={concatClassNames(
          isLedgerSpace ? classes.space : classes.line,
          classes.occupied
        )}
        style={{ "--length": length } as CSSProperties}
      >
        {note && <div className={classes.note}>{note}</div>}
      </li>
    );
};

export default LedgerUnit;
