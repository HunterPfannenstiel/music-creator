import { FunctionComponent, ReactNode } from "react";
import classes from "./index.module.css";

interface LedgerConatinerProps {
  ledgerSpace: ReactNode;
  ledgerLine: ReactNode;
}

const LedgerConatiner: FunctionComponent<LedgerConatinerProps> = ({
  ledgerSpace,
  ledgerLine,
}) => {
  return (
    <div className={classes.ledger_line}>
      <ul className={classes.container}>{ledgerSpace}</ul>
      <ul className={classes.container}>{ledgerLine}</ul>
    </div>
  );
};

export default LedgerConatiner;
