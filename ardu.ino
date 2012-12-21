int LDR_Pin = A0; //analog pin 0
int ledPin = 13; 

void setup(){
  Serial.begin(9600);
  pinMode(ledPin, OUTPUT); 
}

void loop(){
  int LDRReading = analogRead(LDR_Pin); 

  Serial.print("{\"photocell\":");
  Serial.print(LDRReading);
  Serial.println("}");
  
  delay(2500); //just here to slow down the output for easier reading

  if (LDRReading < 600){
    digitalWrite(ledPin, HIGH);   // allume la LED
  }
  else{
    digitalWrite(ledPin, LOW);    // Ã©teint la LED
  }

}