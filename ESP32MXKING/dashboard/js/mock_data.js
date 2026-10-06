// ============================================================
// mock_data.js — Generator data dummy untuk preview
// ============================================================

const MockData = {
  active: false,
  intervalId: null,
  rpm: 0,
  speed: 0,
  temp: 70,
  tps: 0,
  iat: 30,
  batt: 14.2,
  coValue: 0,
  frameOK: 0,
  frameError: 0,

  start() {
    this.active = true;
    this.intervalId = setInterval(() => this.tick(), 500);
  },

  stop() {
    this.active = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  },

  tick() {
    // Simulasi RPM naik turun
    const phase = (Date.now() / 2000) % 6.28; // 0-2pi
    this.rpm = Math.round(3000 + Math.sin(phase) * 2500 + Math.random() * 500);
    this.rpm = Math.max(0, Math.min(CONFIG.MAX_RPM, this.rpm));

    this.speed = Math.round(this.rpm / 100 + Math.random() * 5);
    this.temp = Math.round(75 + Math.sin(phase * 0.5) * 10);
    this.tps = Math.round((this.rpm / CONFIG.MAX_RPM) * 80 + Math.random() * 10);
    this.iat = Math.round(28 + Math.random() * 5);
    this.batt = (14.0 + Math.random() * 0.5).toFixed(1);
    this.frameOK += 1;
    if (Math.random() > 0.95) this.frameError += 1;

    // Emit data
    if (typeof UIRender !== "undefined") {
      UIRender.renderData({
        connected: true,
        rpm: this.rpm,
        speed: this.speed,
        coolantTemp: this.temp,
        tps: this.tps,
        iat: this.iat,
        battery: this.batt,
        coValue: this.coValue,
        errorCode: 0,
        framesOK: this.frameOK,
        framesError: this.frameError,
      });
    }
  },

  sendRaw(line) {
    if (typeof UIRender !== "undefined") {
      UIRender.appendLog(line + "\n");
    }
  },
};