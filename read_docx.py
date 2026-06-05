import zipfile
import xml.etree.ElementTree as ET

doc = zipfile.ZipFile('OXAR_Alumni_Website_UI_UX_Design.docx')
xml_content = doc.read('word/document.xml')
tree = ET.fromstring(xml_content)
namespaces = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
text = []
for p in tree.findall('.//w:p', namespaces):
    para_text = "".join([node.text for node in p.findall('.//w:t', namespaces) if node.text])
    text.append(para_text)

with open('output.txt', 'w', encoding='utf-8') as f:
    f.write("\n".join(text))
