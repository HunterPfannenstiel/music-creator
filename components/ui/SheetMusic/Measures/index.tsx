import { FunctionComponent, useState } from "react";
import classes from "./index.module.css";
import ViewMeasureList from "components/Reusable/Measure/ViewMeasure/ViewMeasureList";
import { useMusic } from "@_providers/Music";
import useAnimateModal from "@_hooks/useAnimateModal";
import EditMeasureModal from "components/Reusable/EditMeasureModal";
import { Music } from "custom-objects/client/Music";
import Image from "next/image";
import Link from "next/link";
import Button from "@ui/Button";

interface MeasuresProps {}

const Measures: FunctionComponent<MeasuresProps> = () => {
  const music = useMusic();
  const [bpm, setBPM] = useState(102);
  const [editMeasureIndex, setMeasureEditIndex] = useState(-1);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedMeasures, setSelectedMeasures] = useState<{
    [measure: number]: boolean;
  }>({});
  const [url, setUrl] = useState("");
  const { getModalProps, showModal, handleModal } = useAnimateModal(300);
  const onMeasureClick = (measureIndex: number) => {
    if (isEditMode) {
      setSelectedMeasures((prevState) => ({
        ...prevState,
        [measureIndex]: !prevState[measureIndex],
      }));
    } else {
      setMeasureEditIndex(measureIndex);
      handleModal();
    }
  };

  const onCreatePDF = async () => {
    const url = await Music.createPDF(
      music.measures.map(([notes]) => notes),
      "Blame it on the boogie",
      "Michael Jackson",
      bpm
    );
    console.log(url);
    setUrl(url);
  };

  const toggleEditMode = () => {
    setIsEditMode((prevState) => !prevState);
    if (isEditMode) setSelectedMeasures({});
  };
  return (
    <>
      <Button onClick={toggleEditMode}>
        {isEditMode ? "Leave Edit Mode" : "Edit Mode"}
      </Button>
      <Button onClick={music.onAddMeasure}>Add</Button>
      <Button onClick={music.onPlay.bind(null, 16, bpm)}>Play</Button>
      <Button
        onClick={music.onDuplicateMeasures.bind(
          null,
          Object.keys(selectedMeasures)
        )}
      >
        Duplicate
      </Button>
      <div>
        <label>BPM: </label>
        <input
          onChange={(e) => {
            if (+e.target.value) setBPM(+e.target.value);
          }}
          value={bpm}
        />
      </div>
      <Button onClick={onCreatePDF}>PDF</Button>
      <Link href={url} target="_blank">
        PDF
      </Link>
      <div className={classes.music}>
        <ViewMeasureList
          measuresPerLine={4}
          onMeasureClick={onMeasureClick}
          selectedMeasures={selectedMeasures}
        />
      </div>
      {showModal && (
        <EditMeasureModal
          modalProps={getModalProps()}
          measureIndex={editMeasureIndex}
        />
      )}
    </>
  );
};

export default Measures;
