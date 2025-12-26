function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

setInterval(() => {
  cpuData.shift();
  cpuData.push(random(20, 90));

  memoryData.shift();
  memoryData.push(random(30, 85));

  networkData.shift();
  networkData.push(random(10, 70));

  cpuChart.update();
  memoryChart.update();
  networkChart.update();
}, 2000);
