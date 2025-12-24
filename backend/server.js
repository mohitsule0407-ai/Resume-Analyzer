const express = require("express");
const cors = require("cors");
const analyzeResume = require("./analyzer");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/analyze", (req, res) => {
    const resumeText = req.body.text;
    const result = analyzeResume(resumeText);
    res.json(result);
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});