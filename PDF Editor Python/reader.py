from PyPDF2 import PdfFileReader
from pathlib import Path


pdf_path = Path() #path goes here

pdf = PdfFileReader(str(pdf_path))

for page in pdf.pages:
    print(page.extractText())
