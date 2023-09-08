import { FunctionComponent } from "react";
import NoteBase from "./NoteBase";
import NoteFlag from "./NoteFlag";

interface EigthNoteProps {
  width: string;
}

const EigthNote: FunctionComponent<EigthNoteProps> = ({ width }) => {
  return (
    <NoteBase width={width}>
      <NoteFlag />
    </NoteBase>
  );
};

export default EigthNote;
