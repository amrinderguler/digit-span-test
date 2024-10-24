const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const generateSequence = (length) => {
    return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');
};

app.post('/start', (req, res) => {
    const sequenceLength = req.body.length || 5; // Default sequence length of 5
    const sequence = generateSequence(sequenceLength);
    res.json({ sequence });
});

app.post('/submit', (req, res) => {
    const { userInput, correctSequence } = req.body;
    const score = userInput === correctSequence ? 1 : 0; // Scoring: 1 for correct, 0 for incorrect
    res.json({ score });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
