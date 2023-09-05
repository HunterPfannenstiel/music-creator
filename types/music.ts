import { noteMapping } from "../utils/notes";

export type MeasureNote = {
  val: number;
  name: keyof typeof noteMapping;
  sign?: string;
};

export type MeasureNotes = {
  [ledgerLine: number]: { [startUnit: number]: MeasureNote };
};

type Note = MeasureNote & { x: number; y: number };

export type OccupiedUnits = { [unit: number]: number };
