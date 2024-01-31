import os
import sys
import re

def update_login_html(image_directory, html_file):
    image_files = [f for f in os.listdir(image_directory) if os.path.isfile(os.path.join(image_directory, f))]
    # Add indentation to each image tag
    image_tags = ['        <img src="{{% static \'webclient/image/login_page_images/{}\' %}}" />'.format(f) for f in image_files]

    with open(html_file, 'r') as file:
        content = file.read()

    # Define start and end placeholders
    start_placeholder = '<!-- Dynamic Images START -->'
    end_placeholder = '<!-- Dynamic Images END -->'

    # Use regex to replace content between placeholders
    pattern = '{}.*{}'.format(re.escape(start_placeholder), re.escape(end_placeholder))
    replacement = '{}\n{}\n    {}'.format(start_placeholder, '\n'.join(image_tags), end_placeholder)
    new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)

    with open(html_file, 'w') as file:
        file.write(new_content)

# Use command line arguments for image directory and HTML file paths
if len(sys.argv) != 3:
    print("Usage: python get_images_for_login_page.py <image_directory> <html_file>")
else:
    update_login_html(sys.argv[1], sys.argv[2])
