import base64
with open('output.txt', 'r', encoding='utf-8') as f:
    text = f.read()
b64 = base64.b64encode(text.encode('utf-8')).decode('utf-8')
with open('b64.txt', 'w', encoding='utf-8') as f:
    f.write(b64)
