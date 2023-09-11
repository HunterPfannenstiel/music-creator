import { FunctionComponent, useState } from "react";
import classes from "./index.module.css";
import { useMusic } from "@_providers/Music";
import Modal from "../Modal";
import { ModalProps } from "@_hooks/useAnimateModal";

import NoteSelection from "../Note/NoteSelection";
import EditableMeasure from "../Measure/EditableMeasure";

interface EditMeasureModalProps {
  modalProps: ModalProps;
  measureIndex: number;
}

const EditMeasureModal: FunctionComponent<EditMeasureModalProps> = ({
  measureIndex,
  modalProps,
}) => {
  const music = useMusic();
  const measure = music.measures[measureIndex];
  const [showOutline, setShowOutline] = useState(true);

  const outlineHandler = () => {
    setShowOutline((prevState) => !prevState);
  };

  return (
    <Modal {...modalProps} className={classes.measure_container}>
      <NoteSelection smallestUnit={16} />
      <button onClick={outlineHandler}>Toggle Outline</button>
      <EditableMeasure
        unitsPerMeasure={16}
        notes={measure[0]}
        occupiedUnits={measure[1]}
        showOutline={showOutline}
        onNoteDrop={music.onNoteDrop.bind(null, measureIndex)}
        onNoteClick={music.onNoteClick.bind(null, measureIndex)}
        onClearMeasure={music.onClearMeasure.bind(null, measureIndex)}
      />
    </Modal>
  );
};

export default EditMeasureModal;
