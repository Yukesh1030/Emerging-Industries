import os

filepath = 'd:/yukesh/projects/Emerging Industries/style.css'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace .footer-heading-small text-align
content = content.replace('.footer-heading-small {\n    font-size: 1.1rem;\n    text-align: right;\n}', '.footer-heading-small {\n    font-size: 1.1rem;\n    text-align: center;\n}')

# Replace .footer-newsletter-section p text-align
content = content.replace('.footer-newsletter-section p {\n    font-size: 0.95rem;\n    margin-bottom: 1.5rem;\n    line-height: 1.6;\n    text-align: right;\n}', '.footer-newsletter-section p {\n    font-size: 0.95rem;\n    margin-bottom: 1.5rem;\n    line-height: 1.6;\n    text-align: center;\n}')

# Replace .footer-form justify-content
content = content.replace('.footer-form {\n    display: flex;\n    margin-bottom: 3rem;\n    justify-content: flex-end;\n}', '.footer-form {\n    display: flex;\n    margin-bottom: 3rem;\n    justify-content: center;\n}')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print('CSS updated.')
