
        // Get elements
        const textArea = document.getElementById('textArea');
        const charCount = document.getElementById('charCount');
        const statusMessage = document.getElementById('statusMessage');
        const statusText = document.getElementById('statusText');
        const copyBtn = document.getElementById('copyBtn');
        const pasteBtn = document.getElementById('pasteBtn');
        const clearBtn = document.getElementById('clearBtn');

        // Update character count
        textArea.addEventListener('input', function() {
            charCount.textContent = textArea.value.length;
        });

        // Show status message
        function showStatus(message, type) {
            statusText.textContent = message;
            statusMessage.className = 'status-message show ' + type;
            
            setTimeout(function() {
                statusMessage.className = 'status-message';
            }, 2000);
        }

        // Copy text function
        copyBtn.addEventListener('click', function() {
            const text = textArea.value;
            
            if (text.trim() === '') {
                showStatus('Nothing to copy!', 'error');
                return;
            }

            navigator.clipboard.writeText(text)
                .then(function() {
                    showStatus('✓ Copied to clipboard!', 'success');
                })
                .catch(function(err) {
                    showStatus('Failed to copy text', 'error');
                    console.error('Copy error:', err);
                });
        });

        // Paste text function
        pasteBtn.addEventListener('click', function() {
            navigator.clipboard.readText()
                .then(function(clipboardText) {
                    textArea.value = clipboardText;
                    charCount.textContent = clipboardText.length;
                    showStatus('✓ Pasted from clipboard!', 'success');
                })
                .catch(function(err) {
                    showStatus('Failed to paste. Please grant clipboard permission.', 'error');
                    console.error('Paste error:', err);
                });
        });

        // Clear text function
        clearBtn.addEventListener('click', function() {
            textArea.value = '';
            charCount.textContent = '0';
            showStatus('✓ Cleared!', 'success');
        });
