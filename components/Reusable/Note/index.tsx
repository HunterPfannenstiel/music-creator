import { ComponentPropsWithoutRef, FunctionComponent, ReactNode } from "react";
import classes from "./index.module.css";
import { concatClassNames } from "../../../utils";
import DropItem from "../DragDrop/DropItem";
import { MeasureNote } from "../../../types/music";

export interface NoteProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  isSelected?: boolean;
  noteDetails: MeasureNote;
}

const Note: FunctionComponent<NoteProps> = ({
  children,
  className,
  isSelected,
  noteDetails,
  ...restProps
}) => {
  return (
    <DropItem
      dataName="note"
      dataValue={JSON.stringify(noteDetails)}
      className={concatClassNames(
        classes.note_container,
        className,
        isSelected ? classes.selected : undefined
      )}
      {...restProps}
    >
      {children}
    </DropItem>
  );
};

export default Note;
