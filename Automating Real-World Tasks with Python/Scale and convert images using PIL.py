#!/usr/bin/env python3
from PIL import Image
import os

input_directory = "images"
output_directory = "/opt/icons"
new_size = (128, 128)

# Create the output directory if it doesn't exist
os.makedirs(output_directory, exist_ok=True)

# Iterate through all files in the input directory
for filename in os.listdir(input_directory):
    if not filename.endswith(".DS_Store"):
        # Open the image
        image_path = os.path.join(input_directory, filename)
        image = Image.open(image_path)

        # Rotate the image 90 degrees clockwise
        rotated_image = image.rotate(-90, expand=True)

        rotated_image = rotated_image.convert("RGB")
        # Resize the image to 128x128
        resized_image = rotated_image.resize(new_size)

        # Save the image in JPEG format
        output_filename = os.path.splitext(filename)[0] + ""
        output_path = os.path.join(output_directory, output_filename)
        resized_image.save(output_path, "JPEG")
        os.chmod(output_path, 0o666)

        print(f"Processed: {filename}")

print("All images processed and saved.")
