document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    document.getElementById('btnTranslate').addEventListener('click', translateText);
}

async function translateText() {
    const input = document.getElementById('inputText').value;
    const outputDiv = document.getElementById('output');

    if (!input.trim()) {
        outputDiv.innerText = "Harap masukkan teks terlebih dahulu.";
        return;
    }

    outputDiv.innerText = "Menerjemahkan...";

    // Gantilah API_KEY_ANDA dengan API Key Geminimu
    const API_KEY = "API_KEY_ANDA";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

    const promptText = `Bertindaklah sebagai penerjemah ahli bahasa Jawa dan Indonesia. Jika teks berikut berbahasa Indonesia, terjemahkan ke Bahasa Jawa (Krama/Ngoko yang natural). Jika berbahasa Jawa, terjemahkan ke Bahasa Indonesia yang baik:\n\n"${input}"`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: promptText }] }]
            })
        });

        const data = await response.json();
        if (data.candidates && data.candidates[0].content.parts[0].text) {
            outputDiv.innerText = data.candidates[0].content.parts[0].text;
        } else {
            outputDiv.innerText = "Gagal mendapatkan respon dari AI.";
        }
    } catch (error) {
        console.error(error);
        outputDiv.innerText = "Terjadi kesalahan koneksi/network.";
    }
}
