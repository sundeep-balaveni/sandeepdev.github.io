function r(min, max) {
  return (Math.random() * (max - min) + min).toFixed(2);
}

setInterval(() => {
  cpu.innerText = r(20, 75) + "%";
  memory.innerText = r(40, 85) + "%";
  disk.innerText = Math.floor(r(80, 220)) + " MB/s";
  netIn.innerText = r(10, 40) + " Mbps";
  netOut.innerText = r(8, 35) + " Mbps";
  req.innerText = Math.floor(r(800, 2200));
  error.innerText = r(0.01, 0.08) + "%";
  latency.innerText = Math.floor(r(90, 240)) + " ms";
}, 3000);
