import { FunctionComponent } from "react";
import NoteBase from "./NoteBase";

interface HalfNoteProps {}

const HalfNote: FunctionComponent<HalfNoteProps> = () => {
  return <NoteBase fill={false} />;
};

export default HalfNote;
