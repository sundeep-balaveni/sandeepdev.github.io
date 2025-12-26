const METRICS = {
  cpu: { base: 45, variance: 5, color: "#60a5fa" },
  memory: { base: 65, variance: 3, color: "#34d399" },
  disk: { base: 120, variance: 20, color: "#fbbf24" },
  netin: { base: 25, variance: 8, color: "#38bdf8" },
  netout: { base: 20, variance: 6, color: "#22d3ee" },
  requests: { base: 1400, variance: 200, color: "#a78bfa" },
  errors: { base: 1, variance: 0.5, color: "#f87171" },
  latency: { base: 120, variance: 15, color: "#fb7185" }
};

const GRID = 20;
const dataStore = {};

// Smooth value generator (no spikes)
function nextValue(prev, base, variance) {
  const drift = (Math.random() - 0.5) * variance;
  const target = base + drift;
  return prev + (target - prev) * 0.15;
}

// Initialize metric grid
function initGrid(base) {
  return Array.from({ length: GRID }, () =>
    Array.from({ length: GRID }, () => base)
  );
}

// Create Plotly surface
function createSurface(id, color, zData) {
  Plotly.newPlot(id, [{
    type: "surface",
    z: zData,
    colorscale: [[0, color], [1, "#ffffff"]],
    showscale: false
  }], {
    margin: { l: 0, r: 0, t: 0, b: 0 },
    paper_bgcolor: "transparent",
    scene: {
      xaxis: { visible: false },
      yaxis: { visible: false },
      zaxis: { visible: false }
    }
  }, { displayModeBar: false });
}

// Initialize all metrics
Object.keys(METRICS).forEach(key => {
  const { base, color } = METRICS[key];
  const grid = initGrid(base);
  dataStore[key] = grid;
  createSurface(key, color, grid);
});

// Update surfaces in real time
function updateMetrics() {
  Object.keys(METRICS).forEach(key => {
    const metric = METRICS[key];
    const grid = dataStore[key];

    // shift rows upward
    for (let i = 0; i < GRID - 1; i++) {
      grid[i] = grid[i + 1];
    }

    // generate new row smoothly
    const lastRow = grid[GRID - 2];
    const newRow = lastRow.map(v =>
      nextValue(v, metric.base, metric.variance)
    );

    grid[GRID - 1] = newRow;

    Plotly.update(key, { z: [grid] });
  });
}

// Update every 3 seconds (CloudWatch-like)
setInterval(updateMetrics, 3000);

// Theme toggle (already wired)
document.getElementById("themeToggle").onclick = () => {
  document.body.dataset.theme =
    document.body.dataset.theme === "dark" ? "light" : "dark";
};
