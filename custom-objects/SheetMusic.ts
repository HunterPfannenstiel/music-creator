import { Note } from "@_types/music";
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
  noteGap = 1;

  constructor(
    stream: NodeJS.WritableStream,
    unitsPerMeasure = 16,
    measuresPerLine = 4,
    measureLineThickness = 1,
    font = "Times-Roman"
  ) {
    this.doc = new PDFDocument({ size: "A4" });
    this.doc.pipe(stream);
    this.font = font;
    this.measuresPerLine = measuresPerLine;
    this.measureLineThickness = measureLineThickness;
    const contentWidth = this.doc.page.width - 2 * this.doc.page.margins.left;
    this.unitWidth = contentWidth / (measuresPerLine * unitsPerMeasure);
    this.unitHeight = (this.unitWidth / 4) * measuresPerLine;
    this.measureWidth = unitsPerMeasure * (this.unitWidth + this.noteGap);
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

  addMeasure(measureNumber: number, notes?: Note[]) {
    const margin = this.doc.page.margins.left;
    const x =
      (measureNumber % this.measuresPerLine) * this.measureWidth + margin;
    const y =
      this.contentY +
      Math.floor(measureNumber / this.measuresPerLine) * this.measureHeight;
    this.doc.lineWidth(this.measureLineThickness);
    // this.doc.rect(x, y, this.measureWidth, this.measureHeight).stroke();
    this.addMeasureLines(x, y);
    if (notes) {
      notes.forEach((note) => {
        this.addNote(x, y, note);
      });
    }
  }

  private addMeasureLines(x: number, y: number) {
    const top = 3 * this.measureLineThickness + 4 * this.unitHeight + y; //there are 3 lines and 4 spaces above the main measure part
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

  private addNote(measureX: number, measureY: number, note: Note) {
    const xVal = measureX + this.getNoteXOffset(note.x, note.val);
    const yVal = measureY + this.getNoteYOffset(note.y);

    this.doc.circle(xVal, yVal, this.unitHeight / 2).stroke();
  }

  private getNoteXOffset(noteXVal: number, noteVal: number) {
    return (noteXVal + noteVal / 2) * (this.unitWidth + this.noteGap);
  }

  private getNoteYOffset(noteYVal: number) {
    const invert = 15 - noteYVal + 1;

    // const numSpaces = Math.ceil(invert / 2);
    // const numLines = Math.floor(invert / 2);
    // console.log(noteYVal, { numSpaces, numLines });
    // let offset =
    //   numSpaces * this.unitHeight + numLines * this.measureLineThickness;
    const offset =
      invert * (this.unitHeight / 2 + this.measureLineThickness / 2);
    // offset +=
    //   invert % 2 === 0 ? this.measureLineThickness / 2 : this.unitHeight / 2;
    return offset;
    //15 (top of measure) unitHeight/2 + 0 * (measureLineThickness/2)
    //14 (line just below the top) unitHeight/2 + measureLineThickness/2
    //13 2 * (unitHeight/2) + 1 (measureLineThickness/2)
    //12 2 * (unitHeight/2) + 2 (measureLineThickness/2)

    //Odd values represent a space, even values represent a line
  }

  finish() {
    this.doc.end();
  }
}
