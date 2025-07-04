document.getElementById('imageInput').addEventListener('change', function () {
    const fileNameDisplay = document.getElementById('fileName');
    if (this.files.length > 0) {
        fileNameDisplay.textContent = `📄 ${this.files[0].name}`;
        fileNameDisplay.style.color = "#ff9800"; 
        fileNameDisplay.style.fontWeight = "bold"; 
    } else {
        fileNameDisplay.textContent = "No file chosen";
        fileNameDisplay.style.color = "white";
        fileNameDisplay.style.fontWeight = "normal";
    }
});

document.getElementById('processButton').addEventListener('click', async () => {
    const fileInput = document.getElementById('imageInput');
    const languageSelect = document.getElementById('languageSelect');
    const outputText = document.getElementById('outputText');
    const outputImage = document.getElementById('outputImage');
    const speakButton = document.getElementById('speakButton');
    const audioPlayer = document.getElementById('audioPlayer');
    const downloadButton = document.getElementById('downloadButton');
    if (fileInput.files.length === 0) {
        alert('⚠️ Please upload an image.');
        return;
    }

    const file = fileInput.files[0];
    const language = languageSelect.value;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('language', language);

    outputText.textContent = '⏳ Processing...';
    speakButton.style.display = "none";
    audioPlayer.style.display = "none";

    const reader = new FileReader();
    reader.onload = (e) => {
        outputImage.src = e.target.result;
        outputImage.style.display = "block";
        outputImage.style.opacity = "0"; 
        downloadButton.style.display = "none"; 
        setTimeout(() => outputImage.style.opacity = "1", 300);  
    };
    reader.readAsDataURL(file);

    try {
        const response = await fetch('http://127.0.0.1:5000/upload', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('❌ Network error.');
        }

        const result = await response.json();
        outputText.textContent = result.text || '⚠️ No text detected.';

        if (result.text) {
            downloadButton.style.display = "inline-block"; 
            speakButton.style.display = "inline-block";
        }
    } catch (error) {
        outputText.textContent = `Error: ${error.message}`;
    }
});

// Text-to-Speech Functionality
document.getElementById('speakButton').addEventListener('click', async () => {
    const text = document.getElementById('outputText').textContent;
    const language = document.getElementById('languageSelect').value;
    const audioPlayer = document.getElementById('audioPlayer');

    if (!text || text === '⚠️ No text detected.') {
        alert('⚠️ No text available for speech.');
        return;
    }

    try {
        const response = await fetch('http://127.0.0.1:5000/speak', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text, language })
        });

        if (!response.ok) {
            throw new Error('TTS failed.');
        }

        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);

        audioPlayer.src = audioUrl;
        audioPlayer.style.display = "block";
        audioPlayer.play();
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
});
document.getElementById('downloadButton').addEventListener('click', () => {
    const text = document.getElementById('outputText').textContent;

    if (!text || text === '⚠️ No text detected.') {
        alert('⚠️ No text available to download.');
        return;
    }

    const blob = new Blob([text], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Detected_Text.txt';
    link.click();
});