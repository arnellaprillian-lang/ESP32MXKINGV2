// ============================================================
// ui_render.js — Update DOM dari data
// ============================================================

const UIRender = {
  lastRpm: -1,
  lastSpeed: -1,
  lastTemp: -1,
  lastTps: -1,
  lastIat: -1,
  lastBatt: "",
  lastCo: -999,
  lastErr: -1,
  lastFok: -1,
  lastFerr: -1,
  logBuffer: "",

  setStatus(text, type) {
    const el = document.getElementById("status");
    if (!el) return;
    el.textContent = text;
    el.className = "status status-" + type;
  },

  renderData(d) {
    // Lazy render: hanya update kalau nilai berubah
    if (d.rpm !== this.lastRpm) {
      this.lastRpm = d.rpm;
      document.getElementById("rpm").textContent = d.rpm;
      const pct = Math.min(100, (d.rpm / CONFIG.MAX_RPM) * 100);
      document.getElementById("rpmBar").style.width = pct + "%";
    }

    if (d.speed !== this.lastSpeed) {
      this.lastSpeed = d.speed;
      document.getElementById("speed").textContent = d.speed;
    }

    if (d.coolantTemp !== this.lastTemp) {
      this.lastTemp = d.coolantTemp;
      document.getElementById("temp").textContent = d.coolantTemp;
    }

    if (d.tps !== this.lastTps) {
      this.lastTps = d.tps;
      document.getElementById("tps").textContent =
        Math.round((d.tps * 100) / 255);
    }

    if (d.iat !== this.lastIat) {
      this.lastIat = d.iat;
      document.getElementById("iat").textContent = d.iat;
    }

    if (d.battery !== this.lastBatt) {
      this.lastBatt = d.battery;
      document.getElementById("batt").textContent = d.battery;
    }

    if (d.errorCode !== this.lastErr) {
      this.lastErr = d.errorCode;
      const el = document.getElementById("err");
      el.textContent = d.errorCode
        ? "0x" + d.errorCode.toString(16).toUpperCase().padStart(4, "0")
        : "OK";
    }

    if (d.framesOK !== this.lastFok) {
      this.lastFok = d.framesOK;
      document.getElementById("fok").textContent = d.framesOK;
    }

    if (d.framesError !== this.lastFerr) {
      this.lastFerr = d.framesError;
      document.getElementById("ferr").textContent = d.framesError;
    }

    if (d.coValue !== this.lastCo) {
      this.lastCo = d.coValue;
      document.getElementById("coValue").textContent = d.coValue;
    }
  },

  appendLog(text) {
    const el = document.getElementById("rawlog");
    if (!el) return;
    el.textContent += text;
    el.scrollTop = el.scrollHeight;

    // Batasi panjang log
    if (el.textContent.length > 5000) {
      el.textContent = el.textContent.slice(-3000);
    }
  },

  clearLog() {
    const el = document.getElementById("rawlog");
    if (el) el.textContent = "";
  },
};