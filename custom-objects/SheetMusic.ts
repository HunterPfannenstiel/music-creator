import PDFDocument from "pdfkit";

export class SheetMusic {
  doc: PDFKit.PDFDocument;
  font: string;
  unitVal: number;
  measuresPerLine: number;
  contentY: number = 0;

  constructor(
    stream: NodeJS.WritableStream,
    unitVal = 6.25,
    measuresPerLine = 4,
    font = "Times-Roman"
  ) {
    this.doc = new PDFDocument();
    this.doc.pipe(stream);
    this.font = font;
    this.unitVal = unitVal;
    this.measuresPerLine = measuresPerLine;
  }
  addHeading(title: string, artist: string, bpm: string) {
    this.doc.fontSize(24);
    this.doc.font("Times-Roman").text(title, { align: "center" });
    this.doc.fontSize(16);
    this.doc.text(artist, { align: "center" });
    this.doc.fontSize(12).text("bpm = " + bpm);
    this.contentY = this.doc.y;
  }

  addMeasure(measureNumber: number) {
    const measureLength = this.unitVal * 16;
    const measureHeight = 5 * this.unitVal;
    this.doc.lineWidth(1);
    this.doc
      .rect(
        (measureNumber % this.measuresPerLine) * measureLength,
        this.contentY +
          Math.floor(measureNumber / this.measuresPerLine) * measureHeight,
        measureLength,
        measureHeight
      )
      .stroke();
  }

  finish() {
    this.doc.end();
  }
}
