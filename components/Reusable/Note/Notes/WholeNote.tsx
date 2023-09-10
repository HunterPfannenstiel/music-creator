import { FunctionComponent } from "react";
import NoteBase from "./NoteBase";

interface WholeNoteProps {}

const WholeNote: FunctionComponent<WholeNoteProps> = () => {
  return <NoteBase fill={false} showStaff={false} />;
};

export default WholeNote;
