import PDFDocument from "pdfkit";

export class SheetMusic {
  doc: PDFKit.PDFDocument;
  font: string;
  measuresPerLine: number;
  contentY: number = 0;
  unitWidth: number;
  unitHeight: number;
  standardMPL = 4; //Standard Measures Per Line
  measureLineThickness: number;
  measureWidth: number;
  measureHeight: number;
  linesPerMeasure = 9;

  constructor(
    stream: NodeJS.WritableStream,
    unitsPerMeasure = 16,
    measuresPerLine = 4,
    measureLineThickness = 1,
    font = "Times-Roman"
  ) {
    this.doc = new PDFDocument({ size: "A4" });
    console.log(this.doc.page.margins);
    this.doc.pipe(stream);
    this.font = font;
    this.measuresPerLine = measuresPerLine;
    this.measureLineThickness = measureLineThickness;
    const contentWidth = this.doc.page.width - 2 * this.doc.page.margins.left;
    this.unitWidth = contentWidth / (measuresPerLine * unitsPerMeasure);
    this.unitHeight = (this.unitWidth / 4) * measuresPerLine;
    this.measureWidth = unitsPerMeasure * this.unitWidth;
    this.measureHeight = 9 * this.unitHeight + 9 * measureLineThickness;
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
    const margin = this.doc.page.margins.left;
    const x =
      (measureNumber % this.measuresPerLine) * this.measureWidth + margin;
    const y =
      this.contentY +
      Math.floor(measureNumber / this.measuresPerLine) * this.measureHeight;
    this.doc.lineWidth(this.measureLineThickness);
    // this.doc.rect(x, y, this.measureWidth, this.measureHeight).stroke();
    this.addMeasureLines(x, y);
  }

  private addMeasureLines(x: number, y: number) {
    const top = 3 * this.measureLineThickness + 4 * this.unitHeight + y;
    const lineGap = this.measureLineThickness + this.unitHeight;
    let topOffset = top;
    for (let i = 0; i < 5; i++) {
      this.doc
        .lineCap("butt")
        .moveTo(x, topOffset)
        .lineTo(x + this.measureWidth, topOffset)
        .stroke();
      topOffset += lineGap;
    }
    this.doc
      .lineCap("butt")
      .moveTo(x, top)
      .lineTo(x, topOffset - lineGap)
      .stroke();
    this.doc
      .lineCap("butt")
      .moveTo(x + this.measureWidth, top)
      .lineTo(x + this.measureWidth, topOffset - lineGap)
      .stroke();
  }

  finish() {
    this.doc.end();
  }
}
