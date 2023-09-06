import { noteMapping } from "../utils/notes";

export type MeasureNote = {
  val: number;
  name: keyof typeof noteMapping;
  sign?: string;
};

export type MeasureNotes = {
  [ledgerLine: string]: { [startUnit: string]: MeasureNote };
};

export type Note = MeasureNote & { x: number; y: number };

export type OccupiedUnits = { [unit: number]: number };
