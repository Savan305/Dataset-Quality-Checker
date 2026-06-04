from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib import colors


def generate_pdf_report(result, filename="dataset_report.pdf"):

    pdf = SimpleDocTemplate(filename)

    styles = getSampleStyleSheet()

    content = []

    # ================= TITLE =================
    content.append(Paragraph("DATASET QUALITY REPORT", styles["Title"]))
    content.append(Spacer(1, 20))

    # ================= DATASET INFO =================
    info = result["dataset_info"]

    content.append(Paragraph("Dataset Overview", styles["Heading2"]))
    content.append(Spacer(1, 10))

    info_table = [
        ["Rows", info["rows"]],
        ["Columns", info["columns"]],
    ]

    table = Table(info_table)
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), colors.grey),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.whitesmoke),
        ("GRID", (0, 0), (-1, -1), 0.5, colors.black),
        ("PADDING", (0, 0), (-1, -1), 6),
    ]))

    content.append(table)
    content.append(Spacer(1, 20))

    # ================= QUALITY SCORE =================
    score = result["quality_score"]

    content.append(Paragraph("Quality Score", styles["Heading2"]))
    content.append(Spacer(1, 10))

    content.append(
        Paragraph(
            f"<b>Score:</b> {score['quality_score']} &nbsp;&nbsp;&nbsp; "
            f"<b>Grade:</b> {score['grade']}",
            styles["BodyText"]
        )
    )

    content.append(Spacer(1, 20))

    # ================= DUPLICATES =================
    dup = result["duplicates"]

    content.append(Paragraph("Duplicate Summary", styles["Heading2"]))
    content.append(
        Paragraph(f"Duplicate Rows: {dup['duplicate_count']}", styles["BodyText"])
    )

    content.append(Spacer(1, 20))

    # ================= OUTLIERS =================
    outliers = result["outliers"]

    content.append(Paragraph("Outlier Summary", styles["Heading2"]))

    for col, val in outliers.items():
        content.append(
            Paragraph(f"{col}: {val} outliers", styles["BodyText"])
        )

    content.append(Spacer(1, 20))

    # ================= RECOMMENDATIONS =================
    content.append(Paragraph("Recommendations", styles["Heading2"]))

    for rec in result["recommendations"]:
        content.append(Paragraph(f"• {rec}", styles["BodyText"]))

    # ================= GENERATE =================
    pdf.build(content)

    print(f"Professional PDF saved as {filename}")