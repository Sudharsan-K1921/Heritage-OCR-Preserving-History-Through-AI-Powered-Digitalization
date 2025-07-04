from flask import Flask, request, jsonify, render_template, send_file
from paddleocr import PaddleOCR
from flask_cors import CORS
from gtts import gTTS
import os
app = Flask(__name__, static_folder='static', template_folder='templates')
CORS(app)
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

TTS_FOLDER = 'tts'
os.makedirs(TTS_FOLDER, exist_ok=True)
app.config['TTS_FOLDER'] = TTS_FOLDER
ocr_instances = {}
LANGUAGE_MAP = {
    'en': 'en',  # English
    'ta': 'ta',  # Tamil
    'sa': 'hi',  # Sanskrit 
    'hi': 'hi',  # Hindi
    'te': 'te'   # Telugu
}

@app.route('/')
def index():
    return render_template('index.html')
@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    language = request.form.get('language', 'en')

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file:
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(filepath)
        global ocr
        ocr = PaddleOCR(lang=language)
        result = ocr.ocr(filepath, cls=True)

        if result is None:
            return jsonify({'error': 'OCR failed to extract text'}), 500

        extracted_text = ' '.join(
            word_info[1][0] for line in result if line for word_info in line if word_info
        )

        return jsonify({'text': extracted_text.strip()}), 200
@app.route('/speak', methods=['POST'])
def text_to_speech():
    data = request.json
    text = data.get('text', '')
    language = data.get('language', 'en')

    if not text:
        return jsonify({'error': 'No text provided'}), 400

    tts_language = LANGUAGE_MAP.get(language, 'en')

    try:
        tts = gTTS(text=text, lang=tts_language, slow=False)
        tts_filename = os.path.join(app.config['TTS_FOLDER'], 'output.mp3')
        tts.save(tts_filename)
        return send_file(tts_filename, mimetype='audio/mp3')
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
