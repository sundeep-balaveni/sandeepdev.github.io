function surfaceMetric(id, color) {
  const x = [...Array(20).keys()];
  const y = [...Array(20).keys()];
  const z = y.map(i => x.map(j => Math.sin(i/3) * Math.cos(j/4) * 10 + 50));

  Plotly.newPlot(id, [{
    type: 'surface',
    x, y, z,
    colorscale: [[0, color], [1, '#ffffff']]
  }], {
    margin: { l: 0, r: 0, t: 0, b: 0 },
    paper_bgcolor: 'transparent',
    scene: {
      xaxis: { visible: false },
      yaxis: { visible: false },
      zaxis: { visible: false }
    }
  }, { displayModeBar: false });
}

surfaceMetric("cpu", "#60a5fa");
surfaceMetric("memory", "#34d399");
surfaceMetric("disk", "#fbbf24");
surfaceMetric("netin", "#38bdf8");
surfaceMetric("netout", "#22d3ee");
surfaceMetric("requests", "#a78bfa");
surfaceMetric("errors", "#f87171");
surfaceMetric("latency", "#fb7185");

document.getElementById("themeToggle").onclick = () => {
  document.body.dataset.theme =
    document.body.dataset.theme === "dark" ? "light" : "dark";
};
