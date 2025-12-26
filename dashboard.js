const CONFIG = {
  cpu:      { base: 45, variance: 6, color: "#4f8df5" },
  memory:   { base: 65, variance: 3, color: "#34c38f" },
  disk:     { base: 120, variance: 25, color: "#f1b44c" },
  netin:    { base: 30, variance: 10, color: "#50a5f1" },
  netout:   { base: 25, variance: 8, color: "#2ab57d" },
  requests: { base: 1400, variance: 300, color: "#a084e8" },
  errors:   { base: 1.5, variance: 0.6, color: "#f46a6a" },
  latency:  { base: 120, variance: 20, color: "#ff6b6b" }
};

const POINTS = 120; // last 2 minutes
const state = {};

function smooth(prev, target) {
  return prev + (target - prev) * 0.08;
}

function initChart(id, cfg) {
  const x = [...Array(POINTS).keys()];
  const y = Array.from({ length: POINTS }, () => cfg.base);

  Plotly.newPlot(id, [{
    x,
    y,
    type: "scattergl",
    mode: "lines",
    fill: "tozeroy",
    line: { color: cfg.color, width: 2 }
  }], {
    margin: { l: 30, r: 10, t: 10, b: 20 },
    paper_bgcolor: "transparent",
    plot_bgcolor: "transparent",
    xaxis: { visible: false },
    yaxis: { visible: false }
  }, { displayModeBar: false });

  state[id] = { x, y, cfg };
}

Object.keys(CONFIG).forEach(id => initChart(id, CONFIG[id]));

function animate() {
  Object.keys(state).forEach(id => {
    const m = state[id];
    const last = m.y[m.y.length - 1];
    const target =
      m.cfg.base + (Math.random() - 0.5) * m.cfg.variance;

    m.y.shift();
    m.y.push(smooth(last, target));

    Plotly.update(id, { y: [m.y] });
  });

  requestAnimationFrame(animate);
}

animate();

// Theme toggle stays
document.getElementById("themeToggle").onclick = () => {
  document.body.dataset.theme =
    document.body.dataset.theme === "dark" ? "light" : "dark";
};
