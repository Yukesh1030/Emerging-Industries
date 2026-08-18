import os
import re

filepath = 'd:/yukesh/projects/Emerging Industries/service.html'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace <div class="service-list-item"> with <div class="service-list-item" onclick="window.location.href='404.html'">
content = content.replace('<div class="service-list-item">', '<div class="service-list-item" onclick="window.location.href=\'404.html\'">')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print('HTML updated.')
