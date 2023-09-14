import { NextApiHandler } from "next";
import { ServerError } from "custom-objects/ServerError";
import { MeasureNotes, Note } from "@_types/music";
import { SheetMusic } from "custom-objects/SheetMusic";
const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "GET") {
      //   const measureNotes = req.body.notes as MeasureNotes[];
      const stream = res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline",
      });
      const measureNotes: MeasureNotes[] = [
        {
          13: { 0: { name: "eighth", val: 2 }, 8: { name: "quarter", val: 4 } },
        },
        {
          0: {
            0: { name: "eighth", val: 1 },
            1: { name: "eighth", val: 1 },
            8: { name: "quarter", val: 4 },
          },
        },
      ];
      const notes = measureNotesToNotes(measureNotes);
      const music = new SheetMusic(stream);
      music.addHeading("Blame it on the Jakeles", "Daniel Caesar", "83");
      notes.forEach((noteGroup, i) => {
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
