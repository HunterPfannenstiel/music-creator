import { FunctionComponent } from "react";
import NoteBase from "./NoteBase";
import NoteFlag from "./NoteFlag";

interface EigthNoteProps {}

const EigthNote: FunctionComponent<EigthNoteProps> = () => {
  return (
    <NoteBase>
      <NoteFlag />
    </NoteBase>
  );
};

export default EigthNote;
