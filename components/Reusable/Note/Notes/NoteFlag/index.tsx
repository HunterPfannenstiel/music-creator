import { CSSProperties, FunctionComponent } from "react";
import classes from "./index.module.css";

interface NoteFlagProps {
  topOffset?: string;
}

const NoteFlag: FunctionComponent<NoteFlagProps> = ({ topOffset = "0%" }) => {
  return (
    <div
      className={classes.flag}
      style={{ marginTop: topOffset } as CSSProperties}
    />
  );
};

export default NoteFlag;
