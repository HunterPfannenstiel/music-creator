import { FunctionComponent } from "react";
import NoteBase from "./NoteBase";
import NoteFlag from "./NoteFlag";

interface SixteenthNoteProps {}

const SixteenthNote: FunctionComponent<SixteenthNoteProps> = () => {
  return (
    <NoteBase>
      <NoteFlag />
      <NoteFlag topOffset="25%" />
    </NoteBase>
  );
};

export default SixteenthNote;
{
  /* <svg
      width="21"
      height="30"
      viewBox="0 0 21 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.3171 6.66667V0H10.3171V17.5833C9.33374 17.0167 8.20041 16.6667 6.98374 16.6667C3.30041 16.6667 0.317078 19.65 0.317078 23.3333C0.317078 27.0167 3.30041 30 6.98374 30C10.6671 30 13.6504 27.0167 13.6504 23.3333V13.3333H20.3171V8.33333H13.6504V6.66667H20.3171Z"
        fill="black"
      />
    </svg> */
}
