#!/usr/bin/env python3
"""Generate the fillable Georgia Open Records request PDF."""

from pathlib import Path

from reportlab.lib.colors import HexColor, white
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "downloads" / "georgia-open-records-request-template.pdf"

PAGE_WIDTH, PAGE_HEIGHT = letter
MARGIN = 48
INK = HexColor("#171713")
MUTED = HexColor("#676257")
PAPER = HexColor("#F5F0E6")
ACCENT = HexColor("#A52A1D")
FIELD_BORDER = HexColor("#9B958A")
FIELD_FILL = white


def header(pdf: canvas.Canvas, page_number: int) -> None:
    pdf.setFillColor(PAPER)
    pdf.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, fill=1, stroke=0)
    pdf.setFillColor(ACCENT)
    pdf.rect(0, PAGE_HEIGHT - 14, PAGE_WIDTH, 14, fill=1, stroke=0)

    pdf.setFillColor(INK)
    pdf.setFont("Helvetica-Bold", 9)
    pdf.drawString(MARGIN, PAGE_HEIGHT - 39, "THE OCMULGEE FREE PRESS")
    pdf.setFillColor(MUTED)
    pdf.setFont("Helvetica", 8)
    pdf.drawRightString(PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 39, f"CITIZEN RESOURCE  |  {page_number} OF 2")
    pdf.setStrokeColor(HexColor("#C8C1B5"))
    pdf.line(MARGIN, PAGE_HEIGHT - 49, PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 49)


def footer(pdf: canvas.Canvas) -> None:
    pdf.setStrokeColor(HexColor("#C8C1B5"))
    pdf.line(MARGIN, 39, PAGE_WIDTH - MARGIN, 39)
    pdf.setFillColor(MUTED)
    pdf.setFont("Helvetica", 7)
    pdf.drawString(MARGIN, 27, "General information only; this template is not legal advice.")
    pdf.drawRightString(PAGE_WIDTH - MARGIN, 27, "ocmulgeefreepress.com")


def section_label(pdf: canvas.Canvas, y: float, number: str, title: str) -> None:
    pdf.setFillColor(ACCENT)
    pdf.setFont("Helvetica-Bold", 8)
    pdf.drawString(MARGIN, y, number)
    pdf.setFillColor(INK)
    pdf.setFont("Helvetica-Bold", 10)
    pdf.drawString(MARGIN + 24, y, title.upper())


def label(pdf: canvas.Canvas, x: float, y: float, text: str) -> None:
    pdf.setFillColor(MUTED)
    pdf.setFont("Helvetica-Bold", 7.5)
    pdf.drawString(x, y, text.upper())


def field(
    pdf: canvas.Canvas,
    name: str,
    x: float,
    y: float,
    width: float,
    height: float = 24,
    *,
    multiline: bool = False,
    font_size: float = 10,
    tooltip: str | None = None,
) -> None:
    pdf.acroForm.textfield(
        name=name,
        tooltip=tooltip or name.replace("_", " ").title(),
        x=x,
        y=y,
        width=width,
        height=height,
        borderStyle="solid",
        borderWidth=0.8,
        borderColor=FIELD_BORDER,
        fillColor=FIELD_FILL,
        textColor=INK,
        forceBorder=True,
        fontName="Helvetica",
        fontSize=font_size,
        fieldFlags=4096 if multiline else 0,
    )


def paragraph(pdf: canvas.Canvas, lines: list[str], x: float, y: float, leading: float = 13) -> float:
    pdf.setFillColor(INK)
    pdf.setFont("Helvetica", 9)
    for line in lines:
        pdf.drawString(x, y, line)
        y -= leading
    return y


def build_pdf() -> None:
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = canvas.Canvas(str(OUTPUT), pagesize=letter, pageCompression=1)
    pdf.setTitle("Fillable Georgia Open Records Request Template")
    pdf.setAuthor("The Ocmulgee Free Press")
    pdf.setSubject("Fillable request form for records under the Georgia Open Records Act")

    # Page 1: request details
    header(pdf, 1)
    pdf.setFillColor(INK)
    pdf.setFont("Times-Bold", 25)
    pdf.drawString(MARGIN, 705, "Georgia Open Records Request")
    pdf.setFillColor(MUTED)
    pdf.setFont("Helvetica", 9)
    pdf.drawString(MARGIN, 685, "Fill in the outlined fields, save a copy, and send it to the agency's records custodian.")

    section_label(pdf, 650, "01", "Request destination")
    label(pdf, MARGIN, 630, "Open Records Officer or Records Custodian")
    field(pdf, "records_officer", MARGIN, 599, 496, 26)
    label(pdf, MARGIN, 582, "Public agency")
    field(pdf, "agency", MARGIN, 551, 496, 26)
    label(pdf, MARGIN, 534, "Agency email or mailing address")
    field(pdf, "agency_contact", MARGIN, 503, 496, 26)

    section_label(pdf, 468, "02", "Records requested")
    paragraph(
        pdf,
        [
            "Under the Georgia Open Records Act, O.C.G.A. §§ 50-18-70 through 50-18-77, I request",
            "electronic copies of the following existing public records:",
        ],
        MARGIN,
        446,
    )
    label(pdf, MARGIN, 412, "Describe the records precisely — include names, subjects, departments, and case numbers")
    field(pdf, "records_requested", MARGIN, 238, 496, 168, multiline=True, font_size=9)

    label(pdf, MARGIN, 221, "Beginning date")
    label(pdf, 222, 221, "Ending date")
    label(pdf, 396, 221, "Preferred format")
    field(pdf, "beginning_date", MARGIN, 190, 148, 26, tooltip="Requested date range beginning")
    field(pdf, "ending_date", 222, 190, 148, 26, tooltip="Requested date range ending")
    field(pdf, "preferred_format", 396, 190, 148, 26, tooltip="For example: native electronic files or searchable PDF")

    pdf.setFillColor(MUTED)
    pdf.setFont("Helvetica-Oblique", 7.5)
    pdf.drawString(MARGIN, 174, "Tip: A narrow date range and specific description can reduce delays and fees.")
    footer(pdf)
    pdf.showPage()

    # Page 2: safeguards and contact information
    header(pdf, 2)
    pdf.setFillColor(INK)
    pdf.setFont("Times-Bold", 22)
    pdf.drawString(MARGIN, 710, "Instructions to the agency")

    section_label(pdf, 674, "03", "Withholdings and redactions")
    paragraph(
        pdf,
        [
            "If any responsive record or portion of a record is withheld, please identify the record and cite the",
            "specific statutory exemption authorizing each withholding or redaction.",
        ],
        MARGIN,
        652,
    )

    section_label(pdf, 606, "04", "Fees")
    pdf.setFillColor(INK)
    pdf.setFont("Helvetica", 9)
    pdf.drawString(MARGIN, 584, "If the estimated cost will exceed $")
    field(pdf, "cost_limit", 195, 574, 72, 24, font_size=10, tooltip="Maximum cost before approval is required")
    pdf.drawString(272, 584, ", please provide a written, itemized estimate and obtain my approval")
    paragraph(
        pdf,
        [
            "before incurring the additional cost. Please identify the hourly rate, tasks charged, estimated time",
            "for each task, and copying or delivery charges. Please apply the first 15 minutes of employee time",
            "without charge as provided by Georgia law.",
        ],
        MARGIN,
        564,
    )

    section_label(pdf, 500, "05", "Response and delivery")
    paragraph(
        pdf,
        [
            "If the records cannot be produced within three business days, please provide the written response",
            "required by law describing the records and stating when they will be available. Please confirm receipt",
            "of this request and deliver responsive records electronically when practicable.",
        ],
        MARGIN,
        478,
    )

    section_label(pdf, 412, "06", "Requester information")
    label(pdf, MARGIN, 392, "Name")
    label(pdf, 309, 392, "Date submitted")
    field(pdf, "requester_name", MARGIN, 361, 237, 26)
    field(pdf, "date_submitted", 309, 361, 235, 26)

    label(pdf, MARGIN, 344, "Email address")
    label(pdf, 309, 344, "Telephone number (optional)")
    field(pdf, "requester_email", MARGIN, 313, 237, 26)
    field(pdf, "requester_phone", 309, 313, 235, 26)

    label(pdf, MARGIN, 296, "Mailing address (optional)")
    field(pdf, "requester_address", MARGIN, 249, 496, 42, multiline=True, font_size=9)

    label(pdf, MARGIN, 232, "Additional delivery instructions (optional)")
    field(pdf, "delivery_instructions", MARGIN, 171, 496, 56, multiline=True, font_size=9)

    pdf.setFillColor(ACCENT)
    pdf.setFont("Helvetica-Bold", 8)
    pdf.drawString(MARGIN, 141, "OFFICIAL GUIDANCE")
    guidance = "https://law.georgia.gov/key-issues/open-government/how-make-open-records-request"
    pdf.setFillColor(INK)
    pdf.setFont("Helvetica", 7.5)
    pdf.drawString(MARGIN, 128, guidance)
    pdf.linkURL(guidance, (MARGIN, 124, PAGE_WIDTH - MARGIN, 137), relative=0)

    pdf.setFillColor(MUTED)
    pdf.setFont("Helvetica-Oblique", 7.5)
    pdf.drawString(MARGIN, 102, "Save the completed PDF before sending it so you retain an exact copy of your request.")
    footer(pdf)
    pdf.save()


if __name__ == "__main__":
    build_pdf()
    print(OUTPUT)
