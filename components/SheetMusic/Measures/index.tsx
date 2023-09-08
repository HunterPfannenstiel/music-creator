import { FunctionComponent } from "react";
import classes from "./index.module.css";
import useMeasures from "../../hooks/useMeasures";
import Measure from "../../Reusable/Measure";

interface MeasuresProps {}

const Measures: FunctionComponent<MeasuresProps> = () => {
  const measureInfo = useMeasures();

  return (
    <>
      <button onClick={measureInfo.onPlay.bind(null, 16, 100)}>Play!</button>
      <button onClick={measureInfo.onAddMeasure}>Add A Measure!</button>
      <ul className={classes.measures}>
        {measureInfo.measures.map((measure, i) => {
          return (
            <Measure
              unitsPerMeasure={16}
              notes={measure[0]}
              occupiedUnits={measure[1]}
              measureNumber={i + 1}
              onNoteDrop={measureInfo.onNoteDrop.bind(null, i)}
              onNoteClick={measureInfo.onNoteClick.bind(null, i)}
              onDeleteMeasure={measureInfo.onDeleteMeasure.bind(null, i)}
              onClearMeasure={measureInfo.onClearMeasure.bind(null, i)}
              onDuplicateMeasure={measureInfo.onDuplicateMeasure.bind(null, i)}
            />
          );
        })}
      </ul>
    </>
  );
};

export default Measures;
