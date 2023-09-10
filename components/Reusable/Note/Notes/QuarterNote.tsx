import { FunctionComponent } from "react";
import NoteBase from "./NoteBase";

interface QuarterNoteProps {
  width: string;
}

const QuarterNote: FunctionComponent<QuarterNoteProps> = ({ width }) => {
  return <NoteBase />;
};

export default QuarterNote;
