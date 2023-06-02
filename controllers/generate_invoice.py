from docxtpl import DocxTemplate
import comtypes.client
from os import path

# temp_invoice = DocxTemplate('../assets/Invoice Template.docx')

# # Replace all placeholders with new data
# context = { 'payment_status' : "Unpaid" }
# temp_invoice.render(context)

# # Save as .docx
# output_path_for_docx = '../assets/latest_invoice.docx'
# temp_invoice.save(output_path_for_docx)

# Convert .docx to pdf
in_file = path.abspath('./assets/latest_invoice.docx')
out_file = path.abspath('./assets/latest_invoice.pdf')

word = comtypes.client.CreateObject('Word.Application')
doc = word.Documents.Open(in_file)
doc.SaveAs(out_file, FileFormat=17)
doc.Close()
word.Quit()
