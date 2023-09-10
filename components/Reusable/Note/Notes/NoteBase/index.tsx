import { CSSProperties, FunctionComponent, ReactNode } from "react";
import classes from "./index.module.css";
import { concatClassNames } from "../../../../../utils";

interface NoteBaseProps {
  showStaff?: boolean;
  children?: ReactNode;
  fill?: boolean;
}

const NoteBase: FunctionComponent<NoteBaseProps> = ({
  children,
  showStaff = true,
  fill = true,
}) => {
  return (
    <div
      className={concatClassNames(
        classes.base,
        fill ? classes.fill : classes.empty
      )}
    >
      {showStaff && <div className={classes.staff}>{children}</div>}
    </div>
  );
};

export default NoteBase;
