from reportlab.platypus import SimpleDocTemplate
from reportlab.platypus import Paragraph, Spacer, Table, Image
from reportlab.lib.styles import getSampleStyleSheet


report = SimpleDocTemplate("practiceFiles/tmp/report.pdf")
("report.pdf")
# ("/practiceFiles/tmp/report.pdf")
styles = getSampleStyleSheet()
report_title = Paragraph("A Complete Inventory of My Fruit", styles["h1"])
print("did something happen")
report.build([report_title])
