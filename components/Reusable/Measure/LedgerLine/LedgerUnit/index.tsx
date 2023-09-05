import { CSSProperties, FunctionComponent, ReactNode } from "react";
import classes from "./index.module.css";
import { concatClassNames } from "../../../../../utils";

interface LedgerUnitProps {
  length?: number;
  note?: ReactNode;
  containsNote?: boolean;
  isLedgerSpace: boolean;
}

const LedgerUnit: FunctionComponent<LedgerUnitProps> = ({
  length = 1,
  note,
  containsNote,
  isLedgerSpace,
}) => {
  return (
    <li
      className={concatClassNames(
        isLedgerSpace ? classes.space : classes.line,
        containsNote ? classes.occupied : undefined
      )}
      style={{ "--length": length } as CSSProperties}
    >
      {note && <div className={classes.note}>{note}</div>}
    </li>
  );
};

export default LedgerUnit;
