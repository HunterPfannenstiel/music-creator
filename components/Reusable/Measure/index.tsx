import { FunctionComponent } from "react";
import classes from "./index.module.css";
import LedgerLine from "./LedgerLine";

interface MeasureProps {
  unitsPerMeasure: number;
}

const Measure: FunctionComponent<MeasureProps> = ({ unitsPerMeasure }) => {
  return (
    <div className={classes.measure}>
      <LedgerLine totalUnits={unitsPerMeasure} />
      <LedgerLine totalUnits={unitsPerMeasure} />
      <LedgerLine totalUnits={unitsPerMeasure} />
      <LedgerLine totalUnits={unitsPerMeasure} />
      <LedgerLine totalUnits={unitsPerMeasure} />
    </div>
  );
};

export default Measure;
