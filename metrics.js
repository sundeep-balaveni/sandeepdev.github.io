function rand(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

setInterval(() => {
  document.getElementById("cpuVal").innerText = rand(20, 85) + "%";
  document.getElementById("memVal").innerText = rand(40, 90) + "%";
  document.getElementById("netVal").innerText = rand(5, 50) + " Mbps";
}, 2000);
