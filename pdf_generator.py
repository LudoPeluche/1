"""
Genera un PDF de reporte de inspección usando ReportLab con el layout solicitado.
Requisitos:
- output_path: ruta de salida del PDF.
- asset: dict con name, location, tag, criticality, description.
- alerts: lista de dicts con campos "title" y (opcional) "detail".
- comments: string con los comentarios ingresados.
- image_path: ruta opcional a la imagen de evidencia.
- inspector: nombre del inspector.
- inspection_date: datetime de la inspección.
"""

from datetime import datetime
from pathlib import Path
from typing import List, Dict, Optional

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    Image,
    KeepTogether,
)

# Paleta
PRIMARY = colors.HexColor("#1e293b")
SECONDARY = colors.HexColor("#3b82f6")
ACCENT_GREEN = colors.HexColor("#10b981")
ACCENT_RED = colors.HexColor("#ef4444")
SECTION_BG = colors.HexColor("#334155")
TEXT_LIGHT = colors.white
TEXT_GRAY = colors.HexColor("#cbd5e1")


def _build_styles():
    styles = getSampleStyleSheet()
    styles.add(
        ParagraphStyle(
            name="HeaderTitle",
            fontSize=18,
            leading=22,
            textColor=TEXT_LIGHT,
            spaceAfter=4,
        )
    )
    styles.add(
        ParagraphStyle(
            name="HeaderSub",
            fontSize=10,
            leading=12,
            textColor=TEXT_GRAY,
        )
    )
    styles.add(
        ParagraphStyle(
            name="SectionTitle",
            fontSize=12,
            leading=14,
            textColor=TEXT_LIGHT,
            backColor=SECTION_BG,
            leftIndent=4,
            spaceBefore=12,
            spaceAfter=6,
            padding=4,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Body",
            fontSize=10,
            leading=14,
            textColor=TEXT_LIGHT,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Muted",
            fontSize=9,
            leading=12,
            textColor=TEXT_GRAY,
        )
    )
    styles.add(
        ParagraphStyle(
            name="AlertTitle",
            fontSize=11,
            leading=14,
            textColor=ACCENT_RED,
            fontName="Helvetica-Bold",
            spaceAfter=2,
        )
    )
    styles.add(
        ParagraphStyle(
            name="AlertBody",
            fontSize=11,
            leading=15,
            textColor=colors.black,
            fontName="Helvetica",
        )
    )
    styles.add(
        ParagraphStyle(
            name="AlertIcon",
            fontSize=12,
            leading=14,
            textColor=ACCENT_RED,
            fontName="Helvetica-Bold",
        )
    )
    return styles


def _header(canvas, doc, asset, inspector, inspection_date):
    canvas.saveState()
    width, height = A4
    canvas.setFillColor(PRIMARY)
    canvas.rect(0, height - 45 * mm, width, 45 * mm, stroke=0, fill=1)

    canvas.setFillColor(TEXT_LIGHT)
    canvas.setFont("Helvetica-Bold", 16)
    canvas.drawString(20 * mm, height - 20 * mm, "PIA - Predictive Inspection App")

    canvas.setFont("Helvetica", 9)
    y = height - 28 * mm
    canvas.drawString(20 * mm, y, f"Activo: {asset.get('name','N/D')}")
    canvas.drawString(20 * mm, y - 5 * mm, f"Ubicación: {asset.get('location','N/D')}")
    canvas.drawString(20 * mm, y - 10 * mm, f"Tag: {asset.get('tag','N/D')}")

    canvas.drawRightString(width - 20 * mm, y, f"Fecha: {inspection_date.strftime('%Y-%m-%d %H:%M')}")
    canvas.drawRightString(width - 20 * mm, y - 5 * mm, f"Inspector: {inspector or 'N/D'}")
    canvas.restoreState()


def _footer(canvas, doc):
    canvas.saveState()
    width, _ = A4
    canvas.setFillColor(TEXT_GRAY)
    canvas.setFont("Helvetica", 8)
    canvas.drawRightString(width - 20 * mm, 15 * mm, f"Página {doc.page}")
    canvas.restoreState()


def _section_title(text, styles):
    return Paragraph(text, styles["SectionTitle"])


def _asset_table(asset, styles):
    data = [
        ["Nombre", asset.get("name", "N/D")],
        ["Ubicación", asset.get("location", "N/D")],
        ["Tag", asset.get("tag", "N/D")],
        ["Criticidad", asset.get("criticality", "N/D")],
    ]
    table = Table(
        data,
        colWidths=[30 * mm, 140 * mm],
        style=TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#0f172a")),
                ("TEXTCOLOR", (0, 0), (-1, -1), TEXT_LIGHT),
                ("LINEBELOW", (0, 0), (-1, -1), 0.25, SECTION_BG),
                ("FONTNAME", (0, 0), (-1, -1), "Helvetica"),
                ("FONTSIZE", (0, 0), (-1, -1), 9),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                ("TOPPADDING", (0, 0), (-1, -1), 4),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
            ]
        ),
    )
    return table


from html import escape

def _alert_box(alert, styles):
    """Renderiza una alerta en una sola línea clara: ALERTA: texto."""
    title = escape(alert.get("title", "Alerta"))
    detail = escape(alert.get("detail") or "")
    body_text = detail if detail else title

    content = Paragraph(f"<b>ALERTA:</b> {body_text}", styles["AlertBody"])
    table = Table(
        [[content]],
        colWidths=[170 * mm],
        style=TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#fee2e2")),
                ("BOX", (0, 0), (-1, -1), 1, ACCENT_RED),
                ("LEFTPADDING", (0, 0), (-1, -1), 12),
                ("RIGHTPADDING", (0, 0), (-1, -1), 12),
                ("TOPPADDING", (0, 0), (-1, -1), 12),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 12),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
            ]
        ),
    )
    return KeepTogether(table)


def _image_block(path: str, styles, caption: str):
    img = Image(path)
    img._restrictSize(170 * mm, 100 * mm)
    caption_p = Paragraph(caption, styles["Muted"])
    return KeepTogether([img, Spacer(1, 4), caption_p])


def generate_inspection_pdf(
    output_path: str,
    asset: Dict,
    alerts: List[Dict],
    comments: str,
    image_path: Optional[str] = None,
    inspector: str = "",
    inspection_date: Optional[datetime] = None,
):
    """
    Genera el PDF de reporte de inspección.
    """
    inspection_date = inspection_date or datetime.now()
    styles = _build_styles()
    doc = BaseDocTemplate(
        output_path,
        pagesize=A4,
        leftMargin=18 * mm,
        rightMargin=18 * mm,
        topMargin=55 * mm,
        bottomMargin=20 * mm,
    )

    frame = Frame(
        doc.leftMargin,
        doc.bottomMargin,
        doc.width,
        doc.height,
        id="normal",
    )
    template = PageTemplate(
        id="report",
        frames=[frame],
        onPage=lambda c, d: _header(c, d, asset, inspector, inspection_date),
        onPageEnd=_footer,
    )
    doc.addPageTemplates([template])

    flow = []

    # Descripción del activo
    flow.append(_section_title("Sección A - Descripción del Activo", styles))
    flow.append(Spacer(1, 6))
    flow.append(_asset_table(asset, styles))
    if asset.get("description"):
        flow.append(Spacer(1, 6))
        flow.append(Paragraph(asset["description"], styles["Body"]))

    # Resultados (alertas)
    flow.append(_section_title("Sección B - Resultados de la Inspección", styles))
    only_alerts = [a for a in alerts if a]
    if not only_alerts:
        flow.append(Paragraph("Sin alertas reportadas.", styles["Body"]))
    else:
        for alert in only_alerts:
            flow.append(Spacer(1, 10))
            flow.append(_alert_box(alert, styles))

    # Comentarios
    flow.append(_section_title("Sección C - Comentarios", styles))
    if comments:
        flow.append(Paragraph(comments, styles["Body"]))
    else:
        flow.append(Paragraph("Sin comentarios adicionales.", styles["Muted"]))

    # Evidencia fotográfica
    flow.append(_section_title("Sección D - Evidencia Fotográfica", styles))
    if image_path and Path(image_path).exists():
        caption = f"Evidencia - {inspection_date.strftime('%Y-%m-%d %H:%M')}"
        flow.append(_image_block(str(image_path), styles, caption))
    else:
        flow.append(Paragraph("No se adjuntó evidencia fotográfica.", styles["Muted"]))

    doc.build(flow)


if __name__ == "__main__":
    sample_asset = {
        "name": "Bomba Principal M-1",
        "location": "Planta Baja - Área 3",
        "tag": "BM-001",
        "criticality": "A",
        "description": "Motor eléctrico de 500HP. Componente crítico en la línea de producción.",
    }
    sample_alerts = [
        {"title": "Vibración fuera de rango", "detail": "Se detectó vibración anormal en el rodamiento."},
        {"title": "Fuga de aceite", "detail": "Goteo leve en sello mecánico."},
    ]
    generate_inspection_pdf(
        "sample_inspection_report.pdf",
        asset=sample_asset,
        alerts=sample_alerts,
        comments="Revisar alineación y programar cambio de sello.",
        image_path=None,
        inspector="Juan Pérez",
        inspection_date=datetime.now(),
    )
