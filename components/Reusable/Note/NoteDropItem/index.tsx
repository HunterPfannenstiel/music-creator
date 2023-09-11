import { ComponentPropsWithoutRef, FunctionComponent, ReactNode } from "react";
import classes from "./index.module.css";
import DropItem from "components/Reusable/DragDrop/DropItem";
import { concatClassNames } from "@_utils/index";
import { MeasureNote } from "@_types/music";

export interface NoteDropItemProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  isSelected?: boolean;
  noteDetails: MeasureNote;
}

const NoteDropItem: FunctionComponent<NoteDropItemProps> = ({
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

export default NoteDropItem;
