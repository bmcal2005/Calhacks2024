let chart;

function calculateSustainability() {
    updateDataDict();
    updateTabs();
    // Positive Agriculture
    const regenerativeAgriculture = capAtOne(parseFloat(document.getElementById('regenerativeAgriculture').value) / 7);
    const sustainablySourced = capAtOne(parseFloat(document.getElementById('sustainablySourced').value) / 100);
    const waterConsumption = capAtOne(parseFloat(document.getElementById('waterEfficiency').value) / 15);
    const energyEfficiency = capAtOne(parseFloat(document.getElementById('livesImproved').value) / 250);

    // Positive Value Chain
    const recycledPackaging = capAtOne(parseFloat(document.getElementById('directEmissions').value) / 75);
    const recyclableMaterial = capAtOne(parseFloat(document.getElementById('indirectEmissions').value) / 40);
    const carbonEmissions = capAtOne(parseFloat(document.getElementById('operationalWaterEfficiency').value) / 25);
    const waterReplenished = capAtOne(parseFloat(document.getElementById('waterReplenished').value) / 100);
    const reusablePackaging = capAtOne(parseFloat(document.getElementById('reusablePackaging').value) / 20);
    const recyclablePackaging = capAtOne(parseFloat(document.getElementById('recyclablePackaging').value) / 100);
    const virginPlastic = capAtOne(parseFloat(document.getElementById('virginPlastic').value) / 20);

    // Positive Choices
    const addedSugars = capAtOne(parseFloat(document.getElementById('addedSugars').value) / 67);
    const addedSodium = capAtOne(parseFloat(document.getElementById('addedSodium').value) / 75);
    const addedFats = capAtOne(parseFloat(document.getElementById('addedFats').value) / 75);

    // If over target, set equal to 1
    

    // Calculate scores (this is a simplified calculation and should be adjusted based on PepsiCo's actual metrics)
    const agricultureScore = (sustainablySourced + regenerativeAgriculture + waterConsumption + energyEfficiency) / 4 * 100;
    const valueChainScore = (recycledPackaging + recyclableMaterial + carbonEmissions + waterReplenished + reusablePackaging + recyclablePackaging + virginPlastic) / 7 * 100;
    const positiveChoices = (addedSugars + addedSodium + addedFats)/3 * 100

    const overallScore = ((agricultureScore + valueChainScore + positiveChoices) / 3);

    const chartElement = document.getElementById('chart');

    const resultElement = document.getElementById('result');
    resultElement.style.display = 'block'
    chartElement.style.display = 'block'

    resultElement.innerHTML = `
        <h3>Results:</h3>
        <p>Positive Agriculture Score: ${agricultureScore.toFixed(2)}%</p>
        <p>Positive Value Chain Score: ${valueChainScore.toFixed(2)}%</p>
        <p>Positive Choices Score: ${positiveChoices.toFixed(2)}%</p>
        <p>Overall Sustainability Score: ${overallScore.toFixed(2)}%</p>
    `;

    updateChart(agricultureScore, valueChainScore, positiveChoices);
}

function capAtOne(value) {
    return value > 1 ? 1 : value;
}

let dataDict = {
        "regenerativeAgriculture": [
            0.345, 0.9, 1.8
        ],
        "sustainablySourced": [
            0, 0, 0,
        ],
        "waterEfficiency": [
            19, 22, 25,
        ],
        "livesImproved": [
            0, 11, 57,
        ],
        "directEmissions" : [
            26, 33, 33,
        ],
        "indirectEmissions" : [
            2, 4, 1,
        ],
        "operationalWaterEfficiency":[
            19, 22, 25,
        ],
        "waterReplenished" : [
            34, 45, 69,
        ],
        "reusablePackaging" : [
            0, 10, 10,
        ],
        "virginPlastic" : [
            5, 11, 6,
        ],
        "recyclablePackaging" : [
            87, 88, 89,
        ],
        "addedSugars" : [
            53, 56, 62,
        ],
        "addedSodium" : [
            66, 68, 72
        ],
        "addedFats" : [
            75, 75, 77,
        ]
    
}; 

function updateDataDict() {
    dataDict.regenerativeAgriculture[3] = parseFloat(document.getElementById('regenerativeAgriculture').value);
    dataDict.sustainablySourced[3] = parseFloat(document.getElementById('sustainablySourced').value);
    dataDict.waterEfficiency[3] = parseFloat(document.getElementById('waterEfficiency').value);
    dataDict.livesImproved[3] = parseFloat(document.getElementById('livesImproved').value);
    dataDict.directEmissions[3] = parseFloat(document.getElementById('directEmissions').value);
    dataDict.indirectEmissions[3] = parseFloat(document.getElementById('indirectEmissions').value);
    dataDict.operationalWaterEfficiency[3] = parseFloat(document.getElementById('operationalWaterEfficiency').value);
    dataDict.waterReplenished[3] = parseFloat(document.getElementById('waterReplenished').value);
    dataDict.reusablePackaging[3] = parseFloat(document.getElementById('reusablePackaging').value);
    dataDict.virginPlastic[3] = parseFloat(document.getElementById('virginPlastic').value);
    dataDict.recyclablePackaging[3] = parseFloat(document.getElementById('recyclablePackaging').value);
    dataDict.addedSugars[3] = parseFloat(document.getElementById('addedSugars').value);
    dataDict.addedSodium[3] = parseFloat(document.getElementById('addedSodium').value);
    dataDict.addedFats[3] = parseFloat(document.getElementById('addedFats').value);
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
                backgroundColor: 'rgba(0, 75, 147, 0.2)',
                borderColor: 'rgba(0, 75, 147, 1)',
                pointBackgroundColor: 'rgba(227, 41, 52, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(227, 41, 52, 1)'
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
            },
            plugins: {
                legend: {
                    labels: {
                        font: {
                            family: 'Comfortaa'
                        }
                    }
                }
            }
        }
    });
}

let finalInfo = {
    "regenerativeAgriculture": 7,
    "sustainablySourced": 100,
    "waterEfficiency": 15,
    "livesImproved": 250,
    "directEmissions": 75,
    "indirectEmissions": 40,
    "operationalWaterEfficiency": 25,
    "waterReplenished": 100,
    "reusablePackaging": 20,
    "recyclablePackaging": 100,
    "virginPlastic": 20,
    "addedSugars": 67,
    "addedSodium": 75,
    "addedFats": 75
};

function linearRegression(name) {
    const x = [1, 2, 3, 4]
    const y = dataDict[name]
    const n = x.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
    
    for (let i = 0; i < n; i++) {
        sumX += x[i];
        sumY += y[i];
        sumXY += x[i] * y[i];
        sumXX += x[i] * x[i];
    }
    
    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
    const predicted_2030 = slope * 10 + intercept;

    return predicted_2030
    }

function classify(name) {
    let prediction = linearRegression(name);
    if ( prediction < finalInfo[name] ) {
        return `Not on track, ${((finalInfo[name] - prediction) / prediction * 100).toFixed(2)}% away from goal`;
    }
    else {
        return "On track.";
    }
}

function updateTabs() {

    document.getElementById('regenerativeAgricultureStatus').textContent = classify('regenerativeAgriculture');
    document.getElementById('sustainablySourcedStatus').textContent = classify('sustainablySourced');
    document.getElementById('waterEfficiencyStatus').textContent = classify('waterEfficiency');
    document.getElementById('livesImprovedStatus').textContent = classify('livesImproved');
    document.getElementById('directEmissionsStatus').textContent = classify('directEmissions');
    document.getElementById('indirectEmissionsStatus').textContent = classify('indirectEmissions');
    document.getElementById('operationalWaterEfficiencyStatus').textContent = classify('operationalWaterEfficiency');
    document.getElementById('waterReplenishedStatus').textContent = classify('waterReplenished');
    document.getElementById('reusablePackagingStatus').textContent = classify('reusablePackaging');
    document.getElementById('virginPlasticStatus').textContent = classify('virginPlastic');
    document.getElementById('recyclablePackagingStatus').textContent = classify('recyclablePackaging');
    document.getElementById('addedSugarsStatus').textContent = classify('addedSugars');
    document.getElementById('addedSodiumStatus').textContent = classify('addedSodium');
    document.getElementById('addedFatsStatus').textContent = classify('addedFats');

    // Add similar lines for other metrics
}
function openTab(tabId) {
    // Hide all tab contents
    var tabs = document.getElementsByClassName('tab-content');
    for(var i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('active');
    }
    
    // Deactivate all tab buttons
    var buttons = document.getElementsByClassName('tab-button');
    for(var i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('active');
    }
    
    // Show selected tab content
    document.getElementById(tabId).classList.add('active');
    
    // Activate selected tab button
    event.target.classList.add('active');
}
