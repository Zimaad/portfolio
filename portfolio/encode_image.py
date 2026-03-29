import base64
import sys

file_path = r"C:\Users\zimaa\.gemini\antigravity\brain\e6115892-1e86-4c87-bb27-895431073668\vector_art_png_1774800908722.png"
try:
    with open(file_path, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
        print(f"data:image/png;base64,{encoded_string}")
except Exception as e:
    print(f"Error: {e}")
