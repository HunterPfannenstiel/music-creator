import { FunctionComponent } from "react";
import NoteBase from "./NoteBase";

interface WholeNoteProps {
  width: string;
}

const WholeNote: FunctionComponent<WholeNoteProps> = ({ width }) => {
  return <NoteBase fill={false} showStaff={false} />;
};

export default WholeNote;
