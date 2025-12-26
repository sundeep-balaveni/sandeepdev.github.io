function createMetric(id, data, color) {
  new Chart(document.getElementById(id), {
    type: "line",
    data: {
      labels: data.map((_, i) => i),
      datasets: [{
        data: data,
        borderColor: color,
        borderWidth: 2,
        tension: 0.3,
        pointRadius: 0
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
}

/* REALISTIC METRIC SHAPES */
createMetric("cpu",
  [42,45,47,44,46,48,50,49,47,46,48,45],
  "#60a5fa"
);

createMetric("memory",
  [60,61,62,63,64,65,66,67,68,69,70,71],
  "#34d399"
);

createMetric("disk",
  [120,180,140,200,160,190,150,175,165,180,155,170],
  "#fbbf24"
);

createMetric("netin",
  [20,25,30,28,35,32,38,36,34,37,33,31],
  "#38bdf8"
);

createMetric("netout",
  [18,20,22,21,24,23,26,25,24,23,22,21],
  "#22d3ee"
);

createMetric("req",
  [800,950,1100,1300,1500,1700,1650,1600,1550,1500,1450,1400],
  "#a78bfa"
);

createMetric("err",
  [0,0,1,0,0,0,1,0,0,0,0,0],
  "#f87171"
);

createMetric("lat",
  [120,118,117,116,115,114,113,114,115,116,117,118],
  "#fb7185"
);
