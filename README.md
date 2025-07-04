# 🏛️ Heritage OCR: Preserving History Through AI-Powered Digitalization

Heritage OCR is an AI-powered solution that digitizes and preserves historical texts and manuscripts. It uses Optical Character Recognition (OCR) and intelligent preprocessing to extract and enhance text from old or degraded documents — making cultural heritage searchable, readable, and accessible.

---

## 🚀 Features

- 📜 OCR for historical documents using Tesseract
- 🧹 Preprocessing (grayscale, denoising, thresholding, etc.)
- 🧠 AI-based text enhancement and error correction (optional)
- 🌐 Web interface for uploading and processing images
- 📊 Visual output showing extracted text and confidence scores

---

## 🧠 Tech Stack

- **Python 3.9+**
- **OpenCV / PIL** – Image processing
- **Tesseract OCR** – Optical character recognition
- **Streamlit** *(or Flask)* – Web interface
- **NumPy / Pandas** – Data handling

---

## 🧰 Installation (Step-by-step)

## 1. 📦 Clone the Repository
         git clone https://github.com/Sudharsan-K1921/Heritage-OCR-Preserving-History-Through-AI-Powered-Digitalization.git
         cd Heritage-OCR-Preserving-History-Through-AI-Powered-Digitalization

## 2. 🐍 Set up a Virtual Environment (Optional but Recommended)
         python -m venv .venv
		 Activate:
		 On Windows
		        .venv\Scripts\activate
		 On macOS/Linux
		        source .venv/bin/activate

## 3. 📥 Install Dependencies
       pip install -r requirements.txt
       
## 4. ⚙️ Install Tesseract OCR
     Windows: Download from https://github.com/tesseract-ocr/tesseract
     Add Tesseract path to your system environment variables (e.g., C:\Program Files\Tesseract-OCR\tesseract.exe)
	Linux (Ubuntu):
	     sudo apt update
	     sudo apt install tesseract-ocr
	macOS:
	     brew install tesseract

## 6. 🖼️ Run the App
		 If you're using Streamlit:
		       streamlit run app.py
		   
		If you're using Flask:
		        python app.py
		Replace app.py with the correct filename of your web UI script.

## 🖼️ Example Workflow
    Upload a scanned image of a historical document
    The system preprocesses the image (resize, grayscale, etc.)
    Text is extracted using OCR
    Enhanced text is displayed with download options

## 📁 Project Structure
		project/
		│
		├── data/ # Sample input images
		├── output/ # Extracted text files
		├── src/ # Python scripts
		├── app.py # Web app (Streamlit/Flask)
		├── requirements.txt
		├── README.md
		└── .gitignore

## 📚 Dataset Suggestions
    Google Books
    Project Gutenberg
    Local scanned manuscripts or museum archives

## 🛠️ Future Improvements
    Multi-language OCR support 
    Handwritten text recognition (HTR)
    Export as searchable PDF
    Auto-layout detection (columns, tables)

