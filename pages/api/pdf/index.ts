import { createBlankDocument, createRectangle } from "@_utils/pdf";
import { addTitle } from "@_utils/pdf/music";
import { NextApiHandler } from "next";
const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const stream = res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline",
      });
      const doc = createBlankDocument(stream);
      addTitle(doc, "Sir Duke");
      doc.end();
    } else {
      return res.status(400).json({ message: "Invalid method" });
    }
  } catch (error: any) {}
};
export default handler;
