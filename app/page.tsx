"use client";

import { FunctionComponent } from "react";
import NoteSelection from "../components/Reusable/Note/NoteSelection";
import Measure from "../components/Reusable/Measure";

interface HomePageProps {}

const HomePage: FunctionComponent<HomePageProps> = () => {
  return (
    <>
      <NoteSelection smallestUnit={16} selectedVal={16} />
      <Measure unitsPerMeasure={16} />
    </>
  );
};

export default HomePage;
