let chart;

// Theme toggle functionality
const body = document.body;
const btnTheme = document.querySelector('.fa-moon');
const addThemeClass = (bodyClass, btnClass) => {
    body.classList.add(bodyClass);
    btnTheme.classList.add(btnClass);
}

const getBodyTheme = localStorage.getItem('portfolio-theme');
const getBtnTheme = localStorage.getItem('portfolio-btn-theme');
addThemeClass(getBodyTheme, getBtnTheme);

const isDark = () => body.classList.contains('dark');

const setTheme = (bodyClass, btnClass) => {
    body.classList.remove(localStorage.getItem('portfolio-theme'));
    btnTheme.classList.remove(localStorage.getItem('portfolio-btn-theme'));

    addThemeClass(bodyClass, btnClass);

    localStorage.setItem('portfolio-theme', bodyClass);
    localStorage.setItem('portfolio-btn-theme', btnClass);
}

const toggleTheme = () => {
    isDark() ? setTheme('light', 'fa-moon') : setTheme('dark', 'fa-sun');
}

btnTheme.addEventListener('click', toggleTheme);

// Sustainability calculation functionality
function calculateSustainability() {
    const regenerativeAgriculture = parseFloat(document.getElementById('regenerativeAgriculture').value);
    const sustainablySourced = parseFloat(document.getElementById('sustainablySourced').value);
    const waterConsumption = parseFloat(document.getElementById('waterConsumption').value);
    const energyEfficiency = parseFloat(document.getElementById('energyEfficiency').value);
    const renewableEnergy = parseFloat(document.getElementById('renewableEnergy').value);
    const pesticideUsage = parseFloat(document.getElementById('pesticideUsage').value);

    const recycledPackaging = parseFloat(document.getElementById('recycledPackaging').value);
    const recyclableMaterial = parseFloat(document.getElementById('recyclableMaterial').value);
    const carbonEmissions = parseFloat(document.getElementById('carbonEmissions').value);

    const positiveChoices = parseFloat(document.getElementById('positiveChoices').value);

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
                label: 'Sustainability Metrics',
                data: [agriculture, valueChain, choices],
                backgroundColor: 'rgba(0, 101, 195, 0.2)',
                borderColor: 'rgba(0, 101, 195, 1)',
                pointBackgroundColor: 'rgba(0, 101, 195, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(0, 101, 195, 1)'
            }]
        },
        options: {
            scales: {
                r: {
                    angleLines: {
                        display: false
                    },
                    suggestedMin: 0,
                    suggestedMax: 100
                }
            }
        }
    });
}
