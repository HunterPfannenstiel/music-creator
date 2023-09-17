import { MeasureNotes } from "@_types/music";
import APIRequest from "../APIRequst";

export class Music {
  static async createPDF(
    notes: MeasureNotes[],
    title: string,
    artist: string,
    bpm: number
  ) {
    const res = await fetch("/api/pdf/create", {
      method: "POST",
      body: JSON.stringify({ notes, title, artist, bpm }),
      headers: { "Content-Type": "application/json" },
    });

    const pdf = await res.blob();
    console.log(pdf.type, pdf.size);
    const url = window.URL.createObjectURL(pdf);
    return url;
  }
}
