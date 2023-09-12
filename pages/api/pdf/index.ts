import { SheetMusic } from "custom-objects/SheetMusic";
import { NextApiHandler } from "next";
const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const stream = res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline",
      });
      const sheetMusic = new SheetMusic(stream);
      sheetMusic.addHeading("Sir Duke", "Stevie Wonder", "107");
      sheetMusic.addMeasure(0);
      sheetMusic.addMeasure(1);
      sheetMusic.addMeasure(4);
      sheetMusic.finish();
    } else {
      return res.status(400).json({ message: "Invalid method" });
    }
  } catch (error: any) {}
};
export default handler;
