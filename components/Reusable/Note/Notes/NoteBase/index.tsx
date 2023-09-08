import { CSSProperties, FunctionComponent, ReactNode } from "react";
import classes from "./index.module.css";
import { concatClassNames } from "../../../../../utils";

interface NoteBaseProps {
  width: string;
  showStaff?: boolean;
  children?: ReactNode;
  fill?: boolean;
}

const NoteBase: FunctionComponent<NoteBaseProps> = ({
  width,
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
      style={{ "--width": width } as CSSProperties}
    >
      {showStaff && <div className={classes.staff}>{children}</div>}
    </div>
  );
};

export default NoteBase;
