import { FunctionComponent } from "react";
import classes from "./index.module.css";
import { useMusic } from "@_providers/Music";
import Modal from "../Modal";
import { ModalProps } from "@_hooks/useAnimateModal";
import Measure from "../Measure";

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

  return (
    <Modal {...modalProps}>
      <div className={classes.measure_container}>
        <Measure
          unitsPerMeasure={16}
          notes={measure[0]}
          occupiedUnits={measure[1]}
          onNoteDrop={music.onNoteDrop.bind(null, measureIndex)}
          onNoteClick={music.onNoteClick.bind(null, measureIndex)}
          onClearMeasure={music.onClearMeasure.bind(null, measureIndex)}
        />
      </div>
    </Modal>
  );
};

export default EditMeasureModal;
