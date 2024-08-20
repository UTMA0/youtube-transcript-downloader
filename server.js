const express = require('express');
const cors = require('cors');
const { YoutubeTranscript } = require('youtube-transcript');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/api/transcript', async (req, res) => {
  const { videoId } = req.query;

  if (!videoId) {
    return res.status(400).json({ error: 'Video ID is required' });
  }

  try {
    console.log(`Fetching transcript for video ID: ${videoId}`);
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    console.log('Transcript fetched successfully');
    res.json(transcript);
  } catch (error) {
    console.error('Error fetching transcript:', error.message);
    res.status(500).json({ error: `An error occurred while fetching the transcript: ${error.message}` });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});