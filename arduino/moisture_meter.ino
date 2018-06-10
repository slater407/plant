#include <ArduinoJson.h>

int sensorPin = A0;
int sensorValue = 0;

char beanName[] = "trappy";

void setup() {
  Bean.setBeanName("trappy");
  Bean.enableWakeOnConnect( true );
  // initialize serial:
  Serial.begin(9600);
}

void loop() {
  // read and set moisture sensor value
  sensorValue = analogRead(sensorPin);
  int batteryPercentage = Bean.getBatteryLevel();
  int tempPercentage = Bean.getTemperature();
  
  String jsonString = "{\"name\":\"";
    jsonString += beanName;
    jsonString +="\",\"batt\":\"";
    jsonString += batteryPercentage;
    jsonString +="\",\"moisture\":\"";
    jsonString += sensorValue;
    jsonString +="\",\"temp\":\"";
    jsonString += tempPercentage;
    jsonString +="\"}";

  // print it:
  Serial.println(jsonString);

  // sleep until another serial request wakes us up
  Bean.sleep(0xFFFFFFFF);
}
