const METRICS = {
  cpu: { base: 45, variance: 5, color: "#60a5fa" },
  memory: { base: 65, variance: 3, color: "#34d399" },
  disk: { base: 120, variance: 20, color: "#fbbf24" },
  netin: { base: 25, variance: 8, color: "#38bdf8" },
  netout: { base: 20, variance: 6, color: "#22d3ee" },
  requests: { base: 1400, variance: 200, color: "#a78bfa" },
  errors: { base: 1, variance: 0.4, color: "#f87171" },
  latency: { base: 120, variance: 15, color: "#fb7185" }
};

const WINDOW = 60; // time points
const state = {};

// Smooth generator
function smooth(prev, base, variance) {
  const target = base + (Math.random() - 0.5) * variance;
  return prev + (target - prev) * 0.08;
}

// Init metric
function initMetric(id, cfg) {
  const y = Array.from({ length: WINDOW }, () => cfg.base);
  const x = [...Array(WINDOW).keys()];

  Plotly.newPlot(id, [{
    x, y,
    type: "scattergl",
    mode: "lines",
    line: {
      color: cfg.color,
      width: 3,
      shape: "spline"
    }
  }], {
    margin: { l: 0, r: 0, t: 0, b: 0 },
    paper_bgcolor: "transparent",
    plot_bgcolor: "transparent",
    xaxis: { visible: false },
    yaxis: { visible: false }
  }, { displayModeBar: false });

  state[id] = { x, y, cfg };
}

// Initialize all metrics
Object.keys(METRICS).forEach(id => initMetric(id, METRICS[id]));

// REAL-TIME LOOP (60 FPS)
function tick() {
  Object.keys(state).forEach(id => {
    const m = state[id];
    m.y.shift();
    m.y.push(smooth(m.y[m.y.length - 1], m.cfg.base, m.cfg.variance));

    Plotly.update(id, { y: [m.y] });
  });

  requestAnimationFrame(tick);
}

tick(); // START animation

// Theme toggle
document.getElementById("themeToggle").onclick = () => {
  document.body.dataset.theme =
    document.body.dataset.theme === "dark" ? "light" : "dark";
};
