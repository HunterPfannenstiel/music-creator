import { ComponentPropsWithoutRef, FunctionComponent, ReactNode } from "react";
import classes from "./index.module.css";
import { concatClassNames } from "../../../utils";

export interface NoteProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  isSelected?: boolean;
}

const Note: FunctionComponent<NoteProps> = ({
  children,
  className,
  isSelected,
  ...restProps
}) => {
  return (
    <div
      className={concatClassNames(
        classes.note_container,
        className,
        isSelected ? classes.selected : undefined
      )}
      {...restProps}
    >
      {children}
    </div>
  );
};

export default Note;
