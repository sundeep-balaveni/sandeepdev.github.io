const labels = Array.from({ length: 10 }, (_, i) => `${i}s`);

let cpuData = Array.from({ length: 10 }, () => Math.random() * 70);
let memoryData = Array.from({ length: 10 }, () => Math.random() * 60);
let networkData = Array.from({ length: 10 }, () => Math.random() * 50);

function createChart(ctx, label, data, color) {
  return new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label,
        data,
        borderColor: color,
        backgroundColor: color + "33",
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, ticks: { color: "#94a3b8" } },
        x: { ticks: { color: "#94a3b8" } }
      }
    }
  });
}

const cpuChart = createChart(
  document.getElementById("cpuChart"),
  "CPU %",
  cpuData,
  "#ef4444"
);

const memoryChart = createChart(
  document.getElementById("memoryChart"),
  "Memory %",
  memoryData,
  "#22c55e"
);

const networkChart = createChart(
  document.getElementById("networkChart"),
  "Network Mbps",
  networkData,
  "#a855f7"
);
