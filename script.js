let chart;
const body = document.body;
const btnTheme = document.getElementById('btn-theme'); // Assuming the button has this ID
const btnHamburger = document.querySelector('.fa-bars');

// Initialize theme from localStorage
const getBodyTheme = localStorage.getItem('portfolio-theme') || 'light';
const getBtnTheme = localStorage.getItem('portfolio-btn-theme') || 'fa-moon';

// Set initial theme
addThemeClass(getBodyTheme, getBtnTheme);

// Function to add classes for theme
const addThemeClass = (bodyClass, btnClass) => {
  body.classList.add(bodyClass);
  btnTheme.classList.add(btnClass);
};

// Check if dark mode is active
const isDark = () => body.classList.contains('dark');

// Function to set the theme
const setTheme = (bodyClass, btnClass) => {
  body.classList.remove(localStorage.getItem('portfolio-theme'));
  btnTheme.classList.remove(localStorage.getItem('portfolio-btn-theme'));

  addThemeClass(bodyClass, btnClass);

  localStorage.setItem('portfolio-theme', bodyClass);
  localStorage.setItem('portfolio-btn-theme', btnClass);
};

// Toggle theme on button click
const toggleTheme = () =>
  isDark() ? setTheme('light', 'fa-moon') : setTheme('dark', 'fa-sun');

btnTheme.addEventListener('click', toggleTheme);

// Function to calculate sustainability
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

  // Calculate scores
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

// Function to update the chart
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

// Hamburger menu functionality
const displayList = () => {
  const navUl = document.querySelector('.nav__list');

  if (btnHamburger.classList.contains('fa-bars')) {
    btnHamburger.classList.remove('fa-bars');
    btnHamburger.classList.add('fa-times');
    navUl.classList.add('display-nav-list');
  } else {
    btnHamburger.classList.remove('fa-times');
    btnHamburger.classList.add('fa-bars');
    navUl.classList.remove('display-nav-list');
  }
};

btnHamburger.addEventListener('click', displayList);

// Scroll up functionality
const scrollUp = () => {
  const btnScrollTop = document.querySelector('.scroll-top');

  if (
    body.scrollTop > 500 ||
    document.documentElement.scrollTop > 500
  ) {
    btnScrollTop.style.display = 'block';
  } else {
    btnScrollTop.style.display = 'none';
  }
};

document.addEventListener('scroll', scrollUp);
