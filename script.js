function generateRandomKey(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function vernamCipher(message, key) {
    var result = '';
    for (var i = 0; i < message.length; i++) {
        var charCode = message.charCodeAt(i) ^ key.charCodeAt(i % key.length);
        result += String.fromCharCode(charCode);
    }
    return result;
}

document.getElementById('encryptBtn').addEventListener('click', () => {
    var message = document.getElementById('inputMessage').value;
    var key = generateRandomKey(message.length);
    document.getElementById('inputKey').value = key;
    var encrypted = vernamCipher(message, key);
    document.getElementById('outputText').value = encrypted;
});

document.getElementById('decryptBtn').addEventListener('click', () => {
    var message = document.getElementById('inputMessage').value;
    var key = document.getElementById('inputKey').value;
    if (key.length !== message.length) {
        alert('The key must be the same length as the message.');
        return;
    }
    var decrypted = vernamCipher(message, key);
    document.getElementById('outputText').value = decrypted;
});

document.getElementById('clearBtn').addEventListener('click', () => {
    document.getElementById('inputMessage').value = '';
    document.getElementById('inputKey').value = '';
    document.getElementById('outputText').value = '';
});

document.getElementById('toggleInstructionsBtn').addEventListener('click', function() {
    var instructions = document.getElementById('howToUse');
    var toggleIcon = document.getElementById('toggleIcon');
    if (instructions.style.display === 'none') {
        instructions.style.display = 'block';
        this.innerHTML = '<span class="fas fa-chevron-up"></span> Hide Instructions';
    } else {
        instructions.style.display = 'none';
        this.innerHTML = '<span class="fas fa-chevron-down"></span> Show Instructions';
    }
});

document.getElementById('exportBtn').addEventListener('click', () => {
    var encryptedText = document.getElementById('outputText').value;
    var key = document.getElementById('inputKey').value;
    var content = "Encrypted Text:\n" + encryptedText + "\n\nKey:\n" + key;
    var blob = new Blob([content], { type: 'text/plain' });
    var url = window.URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.download = 'reef_cipher_output.txt';
    link.href = url;
    link.click();
    window.URL.revokeObjectURL(url);
});
