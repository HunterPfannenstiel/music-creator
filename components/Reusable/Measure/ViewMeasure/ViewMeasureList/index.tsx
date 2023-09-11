import { FunctionComponent, ReactNode } from "react";
import classes from "./index.module.css";
import { useMusic } from "@_providers/Music";
import ViewMeasure from "..";

interface ViewMeasureListProps {
  measuresPerLine: number;
  onMeasureClick?: (index: number) => void;
}

const ViewMeasureList: FunctionComponent<ViewMeasureListProps> = ({
  measuresPerLine,
  onMeasureClick,
}) => {
  const music = useMusic();
  const measures: ReactNode[] = [];
  for (let i = 0; i < music.measures.length; i++) {
    const measure = music.measures[i];
    if (!measure) break;
    measures.push(
      <li
        className={classes.container}
        style={{ width: 100 / measuresPerLine + "%" }}
        onClick={onMeasureClick?.bind(null, i)}
      >
        <ViewMeasure notes={measure[0]} unitsPerMeasure={16} />
      </li>
    );
  }
  return <ul>{measures}</ul>;
};

export default ViewMeasureList;
