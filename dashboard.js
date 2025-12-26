const METRICS = {
  cpu:        { base: 45, variance: 15, color: "#4f8df5" },
  memory:     { base: 65, variance: 8,  color: "#34c38f" },
  network:    { base: 120,variance: 50, color: "#50a5f1" },
  disk:       { base: 80, variance: 40, color: "#f1b44c" },
  requests:   { base: 1400,variance: 600,color: "#a084e8" },
  errors:     { base: 2,  variance: 3,  color: "#f46a6a" },
  latency:    { base: 120,variance: 60, color: "#ff6b6b" },
  containers: { base: 6,  variance: 2,  color: "#6ee7b7" }
};

const WINDOW = 90;
const state = {};

function spike(base, variance) {
  return base + (Math.random() - 0.5) * variance * 2;
}

function initChart(id, cfg) {
  const x = [...Array(WINDOW).keys()];
  const y = Array.from({ length: WINDOW }, () => cfg.base);

  Plotly.newPlot(id, [{
    x,
    y,
    type: "scattergl",
    mode: "lines",
    line: {
      color: cfg.color,
      width: 2,
      shape: "linear"
    }
  }], {
    margin: { l: 30, r: 10, t: 10, b: 20 },
    paper_bgcolor: "transparent",
    plot_bgcolor: "transparent",
    xaxis: { visible: false },
    yaxis: { visible: false }
  }, { displayModeBar: false });

  state[id] = { x, y, cfg };
}

Object.keys(METRICS).forEach(id => initChart(id, METRICS[id]));

function animate() {
  Object.keys(state).forEach(id => {
    const m = state[id];
    m.y.shift();
    m.y.push(spike(m.cfg.base, m.cfg.variance));
    Plotly.update(id, { y: [m.y] });
  });
  requestAnimationFrame(animate);
}

animate();

// Theme toggle
document.getElementById("themeToggle").onclick = () => {
  document.body.dataset.theme =
    document.body.dataset.theme === "dark" ? "light" : "dark";
};
