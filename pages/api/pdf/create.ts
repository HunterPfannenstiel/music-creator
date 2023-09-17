import { NextApiHandler } from "next";
import { ServerError } from "custom-objects/ServerError";
import { MeasureNotes, Note } from "@_types/music";
import { SheetMusic } from "custom-objects/SheetMusic";
const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "POST") {
      const { notes, title, artist, bpm } = req.body;
      const stream = res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=music.pdf",
      });
      // const measureNotes: MeasureNotes[] = [
      //   {
      //     13: { 0: { name: "eighth", val: 2 }, 8: { name: "quarter", val: 4 } },
      //   },
      //   {
      //     0: {
      //       0: { name: "eighth", val: 1 },
      //       1: { name: "eighth", val: 1 },
      //       8: { name: "quarter", val: 4 },
      //     },
      //   },
      // ];
      const n = measureNotesToNotes(notes);
      const music = new SheetMusic(stream);
      music.addHeading(title, artist, bpm);
      n.forEach((noteGroup, i) => {
        music.addMeasure(i, noteGroup);
      });
      music.finish();
    } else {
      return res.status(400).json({ message: "Invalid method" });
    }
  } catch (error: any) {
    ServerError.sendErrorResponse(error, res);
  }
};
export default handler;

const measureNotesToNotes = (measureNotes: MeasureNotes[]) => {
  const notes: Note[][] = measureNotes.map((measure) => {
    const ledgerLines = Object.keys(measure);
    const tempNotes: Note[] = [];
    ledgerLines.forEach((ledgerLine) => {
      const lineNotes = measure[ledgerLine];
      const xValues = Object.keys(lineNotes);
      xValues.forEach((xVal) => {
        tempNotes.push({ ...lineNotes[xVal], y: +ledgerLine, x: +xVal });
      });
    });
    return tempNotes;
  });
  return notes;
};
