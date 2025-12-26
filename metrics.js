function makeMiniChart(id, color) {
  const data = Array.from({ length: 20 }, () => Math.random() * 50);

  const chart = new Chart(document.getElementById(id), {
    type: 'line',
    data: {
      labels: data.map((_, i) => i),
      datasets: [{
        data,
        borderColor: color,
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.4
      }]
    },
    options: {
      animation: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { display: false },
        y: { display: false }
      }
    }
  });

  return { chart, data };
}

const metrics = {
  cpu: makeMiniChart("cpuChart", "#2563eb"),
  mem: makeMiniChart("memChart", "#16a34a"),
  disk: makeMiniChart("diskChart", "#7c3aed"),
  netIn: makeMiniChart("netInChart", "#0284c7"),
  netOut: makeMiniChart("netOutChart", "#0ea5e9"),
  req: makeMiniChart("reqChart", "#f59e0b"),
  err: makeMiniChart("errChart", "#dc2626"),
  lat: makeMiniChart("latChart", "#9333ea")
};

function updateMetric(key, min, max, suffix) {
  const m = metrics[key];
  m.data.shift();
  const val = Math.random() * (max - min) + min;
  m.data.push(val);
  m.chart.update();
  document.getElementById(key + "Val").innerText =
    key === "req" ? Math.floor(val) :
    key === "err" ? val.toFixed(2) + "%" :
    val.toFixed(1) + suffix;
}

setInterval(() => {
  updateMetric("cpu", 20, 75, "%");
  updateMetric("mem", 40, 85, "%");
  updateMetric("disk", 80, 220, " MB/s");
  updateMetric("netIn", 10, 40, " Mbps");
  updateMetric("netOut", 8, 35, " Mbps");
  updateMetric("req", 800, 2200, "");
  updateMetric("err", 0.01, 0.08, "%");
  updateMetric("lat", 90, 240, " ms");
}, 3000);
