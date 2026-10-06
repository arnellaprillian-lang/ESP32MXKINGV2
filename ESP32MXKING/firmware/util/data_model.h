#ifndef DATA_MODEL_H
#define DATA_MODEL_H

#include <Arduino.h>

struct KLineData {
  bool     connected;
  uint16_t rpm;
  uint8_t  speed;
  int8_t   coolantTemp;
  uint8_t  tps;
  uint8_t  iat;
  int8_t   coValue;
  uint16_t errorCode;
  uint32_t framesOK;
  uint32_t framesError;
};

extern KLineData g_data;

#endif
