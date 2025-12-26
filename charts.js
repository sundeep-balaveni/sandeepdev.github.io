const labels = Array.from({ length: 12 }, (_, i) => `${i}s`);

function makeChart(id, color) {
  return new Chart(document.getElementById(id), {
    type: 'line',
    data: {
      labels,
      datasets: [{
        data: labels.map(() => Math.random() * 80),
        borderColor: color,
        backgroundColor: color + "33",
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: "#64748b" } },
        y: { ticks: { color: "#64748b" }, beginAtZero: true }
      }
    }
  });
}

const cpuChart = makeChart("cpuChart", "#ef4444");
const memChart = makeChart("memChart", "#22c55e");
