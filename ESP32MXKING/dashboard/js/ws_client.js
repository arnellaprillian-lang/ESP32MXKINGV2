// ============================================================
// ws_client.js — WebSocket client
// ============================================================

const WSClient = {
  ws: null,
  ip: null,
  connected: false,
  reconnectTimer: null,

  connect(ip) {
    this.ip = ip;
    this.disconnect();

    UIRender.setStatus("Menghubungkan ke " + ip + "...", "wait");

    try {
      this.ws = new WebSocket("ws://" + ip + ":" + CONFIG.WS_PORT);
    } catch (e) {
      UIRender.setStatus("❌ URL tidak valid", "bad");
      return;
    }

    this.ws.onopen = () => {
      this.connected = true;
      UIRender.setStatus("✅ WebSocket terhubung", "ok");
      this.clearReconnect();
    };

    this.ws.onmessage = (event) => {
      try {
        const d = JSON.parse(event.data);
        if (d.type === "data") UIRender.renderData(d);
        else if (d.type === "raw") UIRender.appendLog(d.line);
      } catch (e) {
        console.error("Parse error:", e);
      }
    };

    this.ws.onclose = () => {
      this.connected = false;
      UIRender.setStatus("❌ Terputus", "bad");
      this.scheduleReconnect();
    };

    this.ws.onerror = () => {
      UIRender.setStatus("❌ Gagal connect ke " + ip, "bad");
    };
  },

  disconnect() {
    if (this.ws) {
      this.ws.onclose = null;
      this.ws.close();
      this.ws = null;
    }
    this.connected = false;
    this.clearReconnect();
  },

  scheduleReconnect() {
    if (this.reconnectTimer) return;
    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      if (this.ip) this.connect(this.ip);
    }, CONFIG.RECONNECT_INTERVAL_MS);
  },

  clearReconnect() {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
  },

  send(data) {
    if (this.ws && this.connected) {
      this.ws.send(JSON.stringify(data));
      return true;
    }
    return false;
  },
};