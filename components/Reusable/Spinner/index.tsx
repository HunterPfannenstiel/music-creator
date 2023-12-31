import { FunctionComponent } from "react";
import classes from "./index.module.css";
import { concatClassNames } from "../../../utils";

interface SpinnerProps {
  center?: boolean;
}

const Spinner: FunctionComponent<SpinnerProps> = ({ center }) => {
  return (
    <>
      <div
        className={concatClassNames(
          classes.spinner,
          center ? classes.center : undefined
        )}
      />
    </>
  );
};

export default Spinner;
