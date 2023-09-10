import { FunctionComponent, useState } from "react";
import classes from "./index.module.css";
import ViewMeasureList from "components/Reusable/ViewMeasure/ViewMeasureList";
import { useMusic } from "@_providers/Music";
import useAnimateModal from "@_hooks/useAnimateModal";
import EditMeasureModal from "components/Reusable/EditMeasureModal";

interface MeasuresProps {}

const Measures: FunctionComponent<MeasuresProps> = () => {
  const music = useMusic();
  const [editMeasureIndex, setMeasureEditIndex] = useState(-1);
  const { getModalProps, showModal, handleModal } = useAnimateModal(300);
  const onMeasureClick = (measureIndex: number) => {
    setMeasureEditIndex(measureIndex);
    handleModal();
  };
  return (
    <>
      <button onClick={music.onAddMeasure}>Add</button>
      <div className={classes.music}>
        <ViewMeasureList measuresPerLine={4} onMeasureClick={onMeasureClick} />
      </div>
      {showModal && (
        <EditMeasureModal
          modalProps={getModalProps()}
          measureIndex={editMeasureIndex}
        />
      )}
    </>
  );

  // return (
  //   <>
  //     <button onClick={measureInfo.onPlay.bind(null, 16, 100)}>Play!</button>
  //     <button onClick={measureInfo.onAddMeasure}>Add A Measure!</button>
  //     <ul className={classes.measures}>
  //       {measureInfo.measures.map((measure, i) => {
  //         return (
  //           <Measure
  //             unitsPerMeasure={16}
  //             notes={measure[0]}
  //             occupiedUnits={measure[1]}
  //             measureNumber={i + 1}
  //             onNoteDrop={measureInfo.onNoteDrop.bind(null, i)}
  //             onNoteClick={measureInfo.onNoteClick.bind(null, i)}
  //             onDeleteMeasure={measureInfo.onDeleteMeasure.bind(null, i)}
  //             onClearMeasure={measureInfo.onClearMeasure.bind(null, i)}
  //             onDuplicateMeasure={measureInfo.onDuplicateMeasure.bind(null, i)}
  //           />
  //         );
  //       })}
  //     </ul>
  //   </>
  // );
};

export default Measures;

// notes={{
//   "0": {
//     "0": { val: 2, name: "eighth" },
//     "2": { val: 2, name: "eighth" },
//   },
// }}
