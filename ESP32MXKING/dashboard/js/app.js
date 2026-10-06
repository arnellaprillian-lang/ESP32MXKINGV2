// ============================================================
// app.js — Main init
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  initControls();
  restoreIP();
});

function initControls() {
  // Connect button
  document.getElementById("connectBtn").addEventListener("click", () => {
    const ip = document.getElementById("ipInput").value.trim();
    if (!ip) return alert("Isi IP ESP32 dulu");
    localStorage.setItem("esp32_ip", ip);
    MockData.stop();
    CONFIG.MOCK_MODE = false;
    WSClient.connect(ip);
  });

  // Demo mode button
  document.getElementById("mockBtn").addEventListener("click", () => {
    CONFIG.MOCK_MODE = true;
    WSClient.disconnect();
    UIRender.setStatus("🎭 Demo Mode aktif", "wait");
    MockData.start();
    MockData.sendRaw("TX: FE");
    MockData.sendRaw("RX: 00 00 00 01 01");
  });

  // CO controls
  document.getElementById("coMinus5").addEventListener("click", () => setCO(-5, true));
  document.getElementById("coMinus1").addEventListener("click", () => setCO(-1, true));
  document.getElementById("coPlus1").addEventListener("click", () => setCO(1, true));
  document.getElementById("coPlus5").addEventListener("click", () => setCO(5, true));

  document.getElementById("coInput").addEventListener("change", (e) => {
    const v = parseInt(e.target.value) || 0;
    setCO(v, false);
  });

  document.getElementById("coSendBtn").addEventListener("click", () => {
    const v = parseInt(document.getElementById("coInput").value) || 0;
    sendCOToECU(v);
  });

  // Raw log controls
  document.getElementById("clearLog").addEventListener("click", () => {
    UIRender.clearLog();
  });

  document.getElementById("sendBtn").addEventListener("click", () => {
    const hex = document.getElementById("sendhex").value.trim();
    if (!hex) return;
    const bytes = hex.split(/\s+/).map((h) => parseInt(h, 16)).filter((n) => !isNaN(n));
    if (bytes.length === 0) return alert("Format hex tidak valid");
    WSClient.send({ cmd: "send", bytes });
    UIRender.appendLog("TX: " + bytes.map((b) => b.toString(16).padStart(2, "0").toUpperCase()).join(" ") + "\n");
    document.getElementById("sendhex").value = "";
  });
}

function setCO(delta, relative) {
  const input = document.getElementById("coInput");
  let current = parseInt(input.value) || 0;
  let newVal = relative ? current + delta : delta;

  newVal = Math.max(CONFIG.MIN_CO, Math.min(CONFIG.MAX_CO, newVal));
  input.value = newVal;

  MockData.coValue = newVal;
  document.getElementById("coValue").textContent = newVal;
}

function sendCOToECU(value) {
  if (CONFIG.MOCK_MODE) {
    UIRender.appendLog("TX: CO = " + value + " (mock)\n");
    return;
  }

  // TODO: Protokol YDT untuk set CO — perlu verifikasi dulu
  UIRender.appendLog("TX: [CO] " + value + " (belum diimplementasi)\n");
  alert("Fitur seting CO belum diimplementasi. Sedang riset protokol YDT.");
}

function restoreIP() {
  const saved = localStorage.getItem("esp32_ip");
  if (saved) {
    document.getElementById("ipInput").value = saved;
  }
}