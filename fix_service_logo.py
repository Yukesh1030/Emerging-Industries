import os

filepath = 'd:/yukesh/projects/Emerging Industries/service.html'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('filter: brightness(0) invert(1);', '')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print('service.html logo fixed.')
