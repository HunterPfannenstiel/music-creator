import { FunctionComponent } from "react";
import NoteBase from "./NoteBase";

interface WholeNoteProps {
  width: string;
}

const WholeNote: FunctionComponent<WholeNoteProps> = ({ width }) => {
  return <NoteBase width={width} fill={false} showStaff={false} />;
};

export default WholeNote;
