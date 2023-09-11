"use client";

import { FunctionComponent } from "react";
import NoteSelection from "../components/Reusable/Note/NoteSelection";
import Measures from "../components/ui/SheetMusic/Measures";
import MusicProvider from "@_providers/Music";

interface HomePageProps {}

const HomePage: FunctionComponent<HomePageProps> = () => {
  return (
    <>
      <MusicProvider>
        <Measures />
      </MusicProvider>
    </>
  );
};

export default HomePage;
