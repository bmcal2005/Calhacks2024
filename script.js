let chart;
let isDarkMode = false;

function toggleTheme() {
    isDarkMode = !isDarkMode;

    document.body.classList.toggle('dark-mode');
    const toggleButton = document.getElementById('theme-toggle');
    toggleButton.textContent = isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode';
}

function calculateSustainability() {
    // Positive Agriculture
    const regenerativeAgriculture = parseFloat(document.getElementById('regenerativeAgriculture').value);
    const sustainablySourced = parseFloat(document.getElementById('sustainablySourced').value);
    const waterConsumption = parseFloat(document.getElementById('waterConsumption').value);
    const energyEfficiency = parseFloat(document.getElementById('energyEfficiency').value);
    const renewableEnergy = parseFloat(document.getElementById('renewableEnergy').value);
    const pesticideUsage = parseFloat(document.getElementById('pesticideUsage').value);

    // Positive Value Chain
    const recycledPackaging = parseFloat(document.getElementById('recycledPackaging').value);
    const recyclableMaterial = parseFloat(document.getElementById('recyclableMaterial').value);
    const carbonEmissions = parseFloat(document.getElementById('carbonEmissions').value);

    // Positive Choices
    const positiveChoices = parseFloat(document.getElementById('positiveChoices').value);

    // Calculate scores (this is a simplified calculation and should be adjusted based on PepsiCo's actual metrics)
    const agricultureScore = (sustainablySourced + renewableEnergy) / 2;
    const valueChainScore = (recycledPackaging + recyclableMaterial) / 2;

    const overallScore = (agricultureScore + valueChainScore + positiveChoices) / 3;

    const resultElement = document.getElementById('result');
    resultElement.innerHTML = `
        <h3>Results:</h3>
        <p>Positive Agriculture Score: ${agricultureScore.toFixed(2)}%</p>
        <p>Positive Value Chain Score: ${valueChainScore.toFixed(2)}%</p>
        <p>Positive Choices Score: ${positiveChoices.toFixed(2)}%</p>
        <p>Overall Sustainability Score: ${overallScore.toFixed(2)}%</p>
    `;

    updateChart(agricultureScore, valueChainScore, positiveChoices);
}

function updateChart(agriculture, valueChain, choices) {
    const ctx = document.getElementById('sustainabilityChart').getContext('2d');

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Positive Agriculture', 'Positive Value Chain', 'Positive Choices'],
            datasets: [{
                label: 'Sustainability Scores',
                data: [agriculture, valueChain, choices],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scale: {
                ticks: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}
