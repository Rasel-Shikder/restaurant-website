from docxtpl import DocxTemplate
import os

target_dir = os.path.abspath('../assets')

# # Check if ~$ or .DS_ were not found
# for file in os.listdir(target_dir):
#     if file.startswith('~$') or file.startswith('.DS_'):
#         raise Exception("Could not generate latest_invoice.docx because ~$ or .DS_ file were found.")
    
temp_invoice = DocxTemplate(os.path.abspath(target_dir) + '\Invoice Template.docx')

# Replace all placeholders with new data
context = { 'total' : "1" }
temp_invoice.render(context)

# Save as .docx
output_path_for_docx = os.path.abspath(target_dir) + '\latest_invoice.docx'
temp_invoice.save(output_path_for_docx)


