function analyze() {
    const text = document.getElementById("resume").value;

    fetch("http://localhost:5000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById("result").innerHTML = `
            <h3>Score: ${data.score}</h3>
            <p><b>Issues:</b> ${data.issues.join(", ")}</p>
            <p><b>Suggestion:</b> ${data.suggestion}</p>
        `;
    });
}
