import os

filepath = 'd:/yukesh/projects/Emerging Industries/service.html'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace window.location.href='#' with window.location.href='404.html'
content = content.replace('onclick="window.location.href=\'#\'"', 'onclick="window.location.href=\'404.html\'"')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print('service.html updated.')
