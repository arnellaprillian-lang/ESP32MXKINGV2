#ifndef LOGGER_H
#define LOGGER_H

#include <Arduino.h>

#define LOG_E(fmt, ...) Serial.printf("[E] " fmt "\n", ##__VA_ARGS__)
#define LOG_I(fmt, ...) Serial.printf("[I] " fmt "\n", ##__VA_ARGS__)
#define LOG_D(fmt, ...) Serial.printf("[D] " fmt "\n", ##__VA_ARGS__)

#endif
