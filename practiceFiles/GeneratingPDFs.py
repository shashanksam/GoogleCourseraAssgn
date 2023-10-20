from reportlab.platypus import SimpleDocTemplate
from reportlab.platypus import Paragraph, Spacer, Table, Image
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib import colors


fruit = {
    "elderberries": 1,
    "figs": 1,
    "apples": 2,
    "durians": 3,
    "bananas": 5,
    "cherries": 8,
    "grapes": 13,
}


report = SimpleDocTemplate("practiceFiles/tmp/report.pdf")
# ("report.pdf")
# ("/practiceFiles/tmp/report.pdf")
styles = getSampleStyleSheet()
report_title = Paragraph("A Complete Inventory of My Fruit", styles["h1"])
table_data = []
for k, v in fruit.items():
    table_data.append([k, v])

# print(table_data)
# [['elderberries', 1], ['figs', 1], ['apples', 2], ['durians', 3], ['bananas', 5], ['cherries', 8], ['grapes', 13]]
# report.build([report_title])
report_table = Table(data=table_data)

table_style = [("GRID", (0, 0), (-1, -1), 1, colors.black)]
report_table = Table(data=table_data, style=table_style, hAlign="LEFT")
report.build([report_title, report_table])


report.build([report_title, report_table])
