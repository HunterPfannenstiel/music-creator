import {
  CSSProperties,
  ComponentPropsWithRef,
  FunctionComponent,
  ReactNode,
} from "react";
import classes from "./index.module.css";
import { concatClassNames } from "@_utils/index";

interface UnitProps extends ComponentPropsWithRef<"li"> {
  length: number;
  unitPercent: string;
  isSpace: boolean;
  isOutOfRange: boolean;
  containsNote?: boolean;
  className?: string;
  lineThicknessScale?: number;
  showOutline?: boolean;
}

const Unit: FunctionComponent<UnitProps> = ({
  length,
  unitPercent,
  isSpace,
  isOutOfRange,
  containsNote,
  children,
  className,
  lineThicknessScale = 1,
  showOutline,
  ...restProps
}) => {
  return (
    <li
      className={concatClassNames(
        isSpace ? classes.space : classes.line,
        isOutOfRange ? classes.light : undefined,
        showOutline ? classes.outline : undefined,
        className
      )}
      style={
        {
          "--length": length,
          "--unit-percent": unitPercent,
          "--line-scale": lineThicknessScale,
        } as CSSProperties
      }
      {...restProps}
    >
      {containsNote ? <div className={classes.note}>{children}</div> : children}
    </li>
  );
};
export default Unit;
