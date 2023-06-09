from docxtpl import DocxTemplate
import os


def generate_invoice(payment_status, invoice_id, order_date, customer_name, billing_address, products, sub_total, delivery_charge, discount, total, transaction_date, gateway, transaction_id, paid_amount, balance):
    target_dir = os.path.abspath('../assets')

    # # Check if ~$ or .DS_ were not found
    # for file in os.listdir(target_dir):
    #     if file.startswith('~$') or file.startswith('.DS_'):
    #         raise Exception("Could not generate latest_invoice.docx because ~$ or .DS_ file were found.")
        
    temp_invoice = DocxTemplate(os.path.abspath(target_dir) + '\Invoice Template.docx')

    # Replace all placeholders with new data
    context = {
        'payment_status': payment_status,
        'invoice_id': invoice_id,
        'order_date': order_date,
        'customer_name': customer_name,
        'billing_address': billing_address,
        'products': products,
        'sub_total': sub_total,
        'delivery_charge': delivery_charge,
        'discount': discount,
        'total': total,
        'transaction_date': transaction_date,
        'gateway': gateway,
        'transaction_id': transaction_id,
        'paid_amount': paid_amount,
        'balance': balance
    }
    
    temp_invoice.render(context)

    # Save as .docx
    output_path_for_docx = os.path.abspath(target_dir) + '\latest_invoice.docx'
    temp_invoice.save(output_path_for_docx)


