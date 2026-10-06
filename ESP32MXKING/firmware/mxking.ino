/*
 * mxking.ino - Main Firmware
 * ESP32 MX King K-Line Interface
 */

#include <WiFi.h>
#include "config/config_debug.h"
#include "config/config_wifi.h"
#include "wifi/wifi_manager.h"
#include "web/web_server.h"

void setup() {
  Serial.begin(SERIAL_BAUD);
  delay(1000);
  Serial.println("\n\n=== ESP32 MX King ===");
  wifi_init();
  web_init();
}

void loop() {
  wifi_update();
  web_update();
  delay(20);
}
