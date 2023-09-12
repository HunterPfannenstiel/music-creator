export const addTitle = (doc: PDFKit.PDFDocument, title: string) => {
  doc.fontSize(20);
  doc.font("Times-Roman").text(title, { align: "center" });
};
