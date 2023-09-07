"use client";

import EigthNote from "../components/Reusable/Note/Notes/EighthNote";
import HalfNote from "../components/Reusable/Note/Notes/HalfNote";
import QuarterNote from "../components/Reusable/Note/Notes/QuarterNote";
import SixteenthNote from "../components/Reusable/Note/Notes/SixteenthNote";
import WholeNote from "../components/Reusable/Note/Notes/WholeNote";
import { MeasureNotes, Note } from "../types/music";

export const noteMapping = {
  eighth: EigthNote,
  dottedEighth: EigthNote,
  quarter: QuarterNote,
  half: HalfNote,
  whole: WholeNote,
  sixteenth: SixteenthNote,
};

export const frequencyMapping: { [ledgerLine: number]: number } = {
  "-2": 36.7,
  "-1": 41.2,
  0: 49,
  1: 55,
  2: 61.7,
  3: 65.4,
  4: 73.4,
  5: 82.4,
  6: 87.3,
  7: 98,
  8: 110,
  9: 123.5,
  10: 130.8,
  11: 146.8,
  12: 164.8,
  13: 174.6,
  14: 196.0,
  15: 220,
  16: 246.9,
  17: 261.6,
};

export const playMeasures = async (
  notes: Note[],
  unitsPerMeasure: number,
  bpm: number
) => {
  let i = 0;
  let unitsPassed = 0;
  const secondsPerUnit = 60 / (bpm * (unitsPerMeasure / 4));
  while (i < notes.length) {
    const note = notes[i];
    const unitsUntilPlay = note.x - unitsPassed;
    const delay = unitsUntilPlay * secondsPerUnit;
    const oscillator = createOscillator(
      frequencyMapping[note.y],
      note.val * secondsPerUnit,
      delay
    );
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        const noteDuration = ctx.currentTime + note.val * secondsPerUnit;
        oscillator.start();
        oscillator.stop(noteDuration);
        oscillator.addEventListener("ended", () => {
          i++;
          unitsPassed += note.val + unitsUntilPlay;
          resolve();
        });
      }, delay * 1000);
    });
  }
};

export const measureNotesToNotes = (
  measureNotes: MeasureNotes,
  measureNumber: number,
  unitsPerMeasure: number
): Note[] => {
  const notes: Note[] = [];
  Object.keys(measureNotes).forEach((ledgerLine) => {
    notes.push(
      ...Object.keys(measureNotes[ledgerLine]).map((startUnit) => {
        return {
          ...measureNotes[ledgerLine][startUnit],
          x: +startUnit + measureNumber * unitsPerMeasure,
          y: +ledgerLine,
        };
      })
    );
  });
  return notes.sort((noteA, noteB) => noteA.x - noteB.x);
};

const createOscillator = (
  frequency: number,
  noteLength: number,
  delay: number
) => {
  const attackTime = 0.1;
  const decayTime = 0.2;
  const sustainLevel = 0.8;
  const releaseTime = 0.5;
  const startTime = ctx.currentTime + delay;

  const gainNode = ctx.createGain();
  //gainNode.gain.value = 0.5;
  gainNode.gain.setValueAtTime(0, startTime);
  gainNode.gain.linearRampToValueAtTime(sustainLevel, startTime + attackTime);
  gainNode.gain.linearRampToValueAtTime(sustainLevel, startTime + decayTime);
  gainNode.gain.linearRampToValueAtTime(
    0,
    startTime + decayTime + releaseTime + attackTime + noteLength
  );
  gainNode.connect(ctx.destination);
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.value = frequency;
  osc.connect(gainNode);
  return osc;
};

const ctx = new AudioContext();
// const gainNode = ctx.createGain();
// gainNode.gain.value = 0.5;
// gainNode.connect(ctx.destination);
