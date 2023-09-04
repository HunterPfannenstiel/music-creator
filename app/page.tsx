"use client";

import { FunctionComponent } from "react";
import classes from "./HomePage.module.css";
import EigthNote from "../components/Reusable/Note/Notes/EighthNote";
import NoteSelection from "../components/Reusable/Note/NoteSelection";
import Measure from "../components/Reusable/Measure";

interface HomePageProps {}

const HomePage: FunctionComponent<HomePageProps> = () => {
  return (
    <>
      <NoteSelection
        smallestUnit={16}
        onNoteClick={console.log}
        selectedVal={16}
      />
      <Measure unitsPerMeasure={16} />
    </>
  );
};

export default HomePage;
