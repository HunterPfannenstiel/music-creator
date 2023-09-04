import { CSSProperties, FunctionComponent } from "react";
import classes from "./index.module.css";

interface LedgerLineProps {
  totalUnits: number;
}

const LedgerLine: FunctionComponent<LedgerLineProps> = ({ totalUnits }) => {
  return (
    <div
      className={classes.ledger_line}
      style={{ "--unit-percent": 100 / totalUnits + "%" } as CSSProperties}
    >
      <ul className={classes.container}>
        {new Array(totalUnits).fill(<li className={classes.gap} />)}
      </ul>
      <ul className={classes.container}>
        {new Array(totalUnits).fill(<li className={classes.line} />)}
      </ul>
    </div>
  );
};

export default LedgerLine;
