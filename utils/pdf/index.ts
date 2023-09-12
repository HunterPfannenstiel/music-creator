import PDFDocument from "pdfkit";

export const createBlankDocument = (stream: NodeJS.WritableStream) => {
  const doc = new PDFDocument({ size: "A4" });
  doc.pipe(stream);
  return doc;
};

export const createRectangle = (doc: PDFKit.PDFDocument) => {
  doc.lineWidth(1);
  doc.lineJoin("miter").rect(50, 50, 125, 50).stroke();
};
