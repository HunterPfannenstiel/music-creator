import { FunctionComponent } from "react";
import NoteBase from "./NoteBase";

interface HalfNoteProps {
  width: string;
}

const HalfNote: FunctionComponent<HalfNoteProps> = ({ width }) => {
  return <NoteBase width={width} fill={false} />;
};

export default HalfNote;
