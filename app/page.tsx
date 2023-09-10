"use client";

import { FunctionComponent } from "react";
import NoteSelection from "../components/Reusable/Note/NoteSelection";
import Measures from "../components/ui/SheetMusic/Measures";
import MusicProvider from "@_providers/Music";

interface HomePageProps {}

const HomePage: FunctionComponent<HomePageProps> = () => {
  return (
    <>
      <NoteSelection smallestUnit={16} selectedVal={16} noteWidth="15px" />
      <MusicProvider>
        <Measures />
      </MusicProvider>
    </>
  );
};

export default HomePage;
