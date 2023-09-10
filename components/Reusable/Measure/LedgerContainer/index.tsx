import { CSSProperties, FunctionComponent, ReactNode } from "react";
import classes from "./index.module.css";

interface LedgerConatinerProps {
  unitPercent: string;
  ledgerSpace: ReactNode;
  ledgerLine: ReactNode;
}

const LedgerConatiner: FunctionComponent<LedgerConatinerProps> = ({
  unitPercent,
  ledgerSpace,
  ledgerLine,
}) => {
  return (
    <div
      className={classes.ledger_line}
      style={{ "--unit-percent": unitPercent } as CSSProperties}
    >
      <ul className={classes.container}>{ledgerSpace}</ul>
      <ul className={classes.container}>{ledgerLine}</ul>
    </div>
  );
};

export default LedgerConatiner;
