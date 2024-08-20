const { getTranscript } = require('youtube-transcript');

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const { videoUrl } = req.body;
            const videoId = extractVideoId(videoUrl);

            if (!videoId) {
                return res.status(400).json({ error: 'Invalid YouTube URL' });
            }

            const transcript = await getTranscript(videoId);
            const formattedTranscript = transcript
                .map(item => item.text)
                .join(' ');

            res.status(200).json({ transcript: formattedTranscript });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Failed to fetch transcript' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

function extractVideoId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}