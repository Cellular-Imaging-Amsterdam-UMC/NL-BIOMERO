import os
import sys

def update_login_html(image_directory, html_file, destination_file):
    image_files = [f for f in os.listdir(image_directory) if os.path.isfile(os.path.join(image_directory, f))]
    # Generate a JavaScript array of image paths
    image_paths = ['"{{% static \'webclient/image/login_page_images/{}\' %}}"'.format(f) for f in image_files]
    image_array = 'var images = [{}];'.format(', '.join(image_paths))

    with open(html_file, 'r') as file:
        content = file.read()

    # Define the placeholder for the JavaScript array
    placeholder = '// Image Array Placeholder'

    # Replace the placeholder with the JavaScript array
    new_content = content.replace(placeholder, image_array)

    with open(destination_file, 'w') as file:
        file.write(new_content)

# Use command line arguments for image directory, HTML file paths, and destination file
if len(sys.argv) != 4:
    print("Usage: python get_images_for_login_page.py <image_directory> <html_file> <destination_file>")
else:
    update_login_html(sys.argv[1], sys.argv[2], sys.argv[3])

