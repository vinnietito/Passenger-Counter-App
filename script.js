let count = 0;
let countEl = document.getElementById("count-el");
let saveEl = document.getElementById("save-el");
let chartEl = document.getElementById("chart");
let entries = [];
let labels = [];

function increment() {
    count++;
    countEl.innerText = count;
}

function save() {
    const timestamp = new Date().toLocaleTimeString();
    const entry = `${count} (${timestamp})`;
    entries.push(count);
    labels.push(timestamp);
    updateChart();

    saveEl.textContent += `${entry} - `;
    localStorage.setItem("entries", saveEl.textContent);

    count = 0;
    countEl.innerText = 0;
}

function reset() {
    count = 0;
    entries = [];
    labels = [];
    countEl.innerText = 0;
    saveEl.textContent = "Previous entries: ";
    localStorage.removeItem("entries");
    if (chart) chart.destroy();
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

function exportData() {
    let blob = new Blob([saveEl.textContent], { type: "text/plain;charset=utf-8" });
    let a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "passenger_log.txt";
    a.click();
}

// Chart
let chart = null;
function updateChart() {
    if (chart) chart.destroy();
    chart = new Chart(chartEl, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Passenger Count',
                data: entries,
                borderColor: 'teal',
                fill: false,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Auth (simple)
function authenticate() {
    const pass = document.getElementById("auth-input").value;
    if (pass === "1234") {
        document.getElementById("auth-popup").style.display = "none";
        const saved = localStorage.getItem("entries");
        if (saved) {
            saveEl.textContent = saved;
        }
    } else {
        alert("Wrong passcode!");
    }
}

// Auto-show auth
window.onload = () => {
    document.getElementById("auth-popup").style.display = "flex";
};
