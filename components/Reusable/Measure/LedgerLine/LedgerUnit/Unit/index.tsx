import { CSSProperties, FunctionComponent, ReactNode } from "react";
import classes from "./index.module.css";
import { concatClassNames } from "@_utils/index";

interface UnitProps {
  length: number;
  unitPercent: string;
  isSpace: boolean;
  isOutOfRange: boolean;
  children?: ReactNode;
  className?: string;
  lineThicknessScale?: number;
}

const Unit: FunctionComponent<UnitProps> = ({
  length,
  unitPercent,
  isSpace,
  isOutOfRange,
  children,
  className,
  lineThicknessScale = 1,
}) => {
  return (
    <li
      className={concatClassNames(
        isSpace ? classes.space : classes.line,
        isOutOfRange ? classes.light : undefined,
        className
      )}
      style={
        {
          "--length": length,
          "--unit-percent": unitPercent,
          "--line-scale": lineThicknessScale,
        } as CSSProperties
      }
    >
      {children}
    </li>
  );
};
export default Unit;
