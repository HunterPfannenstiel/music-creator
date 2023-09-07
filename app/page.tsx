"use client";

import { FunctionComponent } from "react";
import NoteSelection from "../components/Reusable/Note/NoteSelection";
import Measures from "../components/SheetMusic/Measures";

interface HomePageProps {}

const HomePage: FunctionComponent<HomePageProps> = () => {
  return (
    <>
      <NoteSelection smallestUnit={16} selectedVal={16} />
      <Measures />
    </>
  );
};

export default HomePage;
