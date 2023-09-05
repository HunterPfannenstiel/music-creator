import { FunctionComponent, useState } from "react";
import classes from "./index.module.css";
import LedgerLine from "./LedgerLine";
import { MeasureNotes, Note, OccupiedUnits } from "../../../types/music";

interface MeasureProps {
  unitsPerMeasure: number;
}

const Measure: FunctionComponent<MeasureProps> = ({ unitsPerMeasure }) => {
  const [occupiedUnits, setOccupiedUnits] = useState<OccupiedUnits>({
    0: 2,
    4: 1,
  });
  const [notes, setNotes] = useState<MeasureNotes>({
    0: { 0: { val: 2, name: "eighth" } },
    1: { 4: { val: 1, name: "sixteenth" } },
  });

  const onNoteDrop = (noteDetails: Note) => {
    setNotes((prevState) => {
      const copyState = { ...prevState };
      if (copyState[noteDetails.y]) {
        copyState[noteDetails.y] = {
          ...copyState[noteDetails.y],
          [noteDetails.x]: { val: noteDetails.val, name: noteDetails.name },
        };
      } else {
        copyState[noteDetails.y] = {
          [noteDetails.x]: { val: noteDetails.val, name: noteDetails.name },
        };
      }
      return copyState;
    });
    setOccupiedUnits((prevState) => ({
      ...prevState,
      [noteDetails.x]: noteDetails.val,
    }));
  };

  return (
    <div className={classes.measure}>
      <LedgerLine
        totalUnits={unitsPerMeasure}
        occupiedUnits={occupiedUnits}
        measureNotes={notes}
        lineNumber={8}
        onNoteDrop={onNoteDrop}
      />
      <LedgerLine
        totalUnits={unitsPerMeasure}
        occupiedUnits={occupiedUnits}
        measureNotes={notes}
        lineNumber={6}
        onNoteDrop={onNoteDrop}
      />
      <LedgerLine
        totalUnits={unitsPerMeasure}
        occupiedUnits={occupiedUnits}
        measureNotes={notes}
        lineNumber={4}
        onNoteDrop={onNoteDrop}
      />
      <LedgerLine
        totalUnits={unitsPerMeasure}
        occupiedUnits={occupiedUnits}
        measureNotes={notes}
        lineNumber={2}
        onNoteDrop={onNoteDrop}
      />
      <LedgerLine
        totalUnits={unitsPerMeasure}
        occupiedUnits={occupiedUnits}
        measureNotes={notes}
        lineNumber={0}
        onNoteDrop={onNoteDrop}
      />
    </div>
  );
};

export default Measure;
