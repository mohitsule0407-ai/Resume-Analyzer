function analyzeResume(text) {
    // Normalize text
    text = text.replace(/\r?\n|\r/g, " ").replace(/\s+/g, " ").toLowerCase();

    let issues = [];

    // Detect missing sections
    if (!text.includes("experience") || text.includes("none")) {
        issues.push("Experience section missing or empty");
    }

    if (!text.includes("skills") || text.includes("none")) {
        issues.push("Skills section missing or empty");
    }

    if (!text.includes("education") || text.length < 50) {
        issues.push("Education section missing or too short");
    }

    // Check resume length
    const wordCount = text.split(" ").length;
    if (wordCount < 100) {
        issues.push("Resume content too short");
    }

    // Detect year gaps
    const years = text.match(/\b(19|20)\d{2}\b/g);
    if (years && years.length >= 2) {
        for (let i = 1; i < years.length; i++) {
            if (parseInt(years[i]) - parseInt(years[i-1]) > 1) {
                issues.push(`Gap detected between ${years[i-1]} and ${years[i]}`);
            }
        }
    } else {
        issues.push("Insufficient date info to detect gaps");
    }

    // Dynamic scoring
    let score = 100 - issues.length * 15;
    if (score < 0) score = 0;

    return {
        score,
        issues,
        suggestion: issues.length > 0 
            ? "Please improve your resume sections, fill gaps, and add skills"
            : "Resume looks good"
    };
}

module.exports = analyzeResume;
