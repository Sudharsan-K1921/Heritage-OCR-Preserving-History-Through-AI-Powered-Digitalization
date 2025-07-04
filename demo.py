import streamlit as st
import pytesseract
from PIL import Image
import io
import os

st.set_page_config(page_title="Heritage OCR", layout="centered")

st.title("📜 Heritage OCR: Digitize Historical Texts")

uploaded_file = st.file_uploader("Upload a historical image", type=["png", "jpg", "jpeg"])

if uploaded_file is not None:
    # Display image
    image = Image.open(uploaded_file)
    st.image(image, caption="Uploaded Image", use_column_width=True)

    with st.spinner("🧠 Extracting text with OCR..."):
        extracted_text = pytesseract.image_to_string(image)

    st.subheader("📝 Extracted Text")
    st.text_area("Text Output", extracted_text, height=300)

    # Download button
    st.download_button("📥 Download Text", extracted_text, file_name="output.txt")

else:
    st.info("Please upload an image to begin.")
