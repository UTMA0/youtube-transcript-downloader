document.addEventListener('DOMContentLoaded', () => {
    const videoUrlInput = document.getElementById('videoUrl');
    const downloadBtn = document.getElementById('downloadBtn');
    const resultDiv = document.getElementById('result');

    downloadBtn.addEventListener('click', async () => {
        const videoUrl = videoUrlInput.value.trim();
        if (!videoUrl) {
            alert('Please enter a valid YouTube video URL');
            return;
        }

        try {
            resultDiv.textContent = 'Downloading transcript...';
            const response = await fetch('/api/transcript', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ videoUrl }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch transcript');
            }

            const data = await response.json();
            if (data.transcript) {
                resultDiv.textContent = data.transcript;
            } else {
                resultDiv.textContent = 'No transcript available for this video.';
            }
        } catch (error) {
            console.error('Error:', error);
            resultDiv.textContent = 'An error occurred while fetching the transcript.';
        }
    });
});